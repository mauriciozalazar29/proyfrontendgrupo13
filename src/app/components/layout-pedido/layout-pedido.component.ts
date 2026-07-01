import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import { MesaService } from '../../services/mesa.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-layout-pedido',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout-pedido.component.html',
  styleUrl: './layout-pedido.component.css',
})
export class LayoutPedidoComponent implements OnInit {
  mesaActiva: { idMesa: number, numMesa: number } | null = null;
  items: ItemCarrito[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private mesaService: MesaService,
    private router: Router
  ) { }

  ngOnInit() {
    // Nos suscribimos a los cambios del estado de la mesa
    this.carritoService.mesaActiva$.subscribe(mesa => {
      this.mesaActiva = mesa;
    });

    // Nos suscribimos a los items del carrito
    this.carritoService.items$.subscribe(items => {
      this.items = items;
      this.total = this.carritoService.getTotal();
    });
  }

  confirmarPedido() {
    if (!this.mesaActiva) {
      alert('Error: No seleccionaste ninguna mesa para atender.');
      this.router.navigate(['/mesa']);
      return;
    }
    if (this.items.length === 0) {
      alert('Error: El carrito está vacío. Agregá productos primero.');
      return;
    }

    //  Crear el Pedido Principal
    this.pedidoService.crearPedido(this.mesaActiva.idMesa).subscribe({
      next: (resPedido) => {
        const idPedido = resPedido.pedido.idPedido;

        //  Crear todos los Detalles del pedido a la vez
        const requests = this.items.map(item =>
          this.pedidoService.agregarDetalle(idPedido, item.idProducto, item.cantidad, item.precio)
        );

        // forkJoin espera a que terminen TODAS las llamadas a los detalles
        forkJoin(requests).subscribe({
          next: () => {
            // Pasar la mesa a "OCUPADA"
            this.mesaService.cambiarEstado(this.mesaActiva!.idMesa, 'OCUPADA').subscribe({
              next: () => {
                alert('¡Pedido enviado a cocina y mesa ocupada con éxito!');
                this.carritoService.limpiarCarrito();
                this.router.navigate(['/mesa']);
              },
              error: () => alert('Pedido creado, pero error al ocupar la mesa.')
            });
          },
          error: () => alert('Error al cargar los detalles del pedido al sistema.')
        });
      },
      error: (err) => alert('Error al crear el pedido: ' + err.message)
    });
  }
}
