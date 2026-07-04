import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import { MesaService } from '../../services/mesa.service';
import { PagoService } from '../../services/pago.service';
import { forkJoin } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout-pedido',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
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
    private pagoService: PagoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carritoService.mesaActiva$.subscribe(mesa => {
      this.mesaActiva = mesa;
    });

    this.carritoService.items$.subscribe(items => {
      this.items = items;
      this.total = this.carritoService.getTotal();
    });
  }

  sumarItem(item: ItemCarrito) {
    this.carritoService.agregarProducto(item);
  }

  restarItem(idProducto: number) {
    this.carritoService.restarProducto(idProducto);
  }

  eliminarItem(idProducto: number) {
    this.carritoService.eliminarProducto(idProducto);
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }

  confirmarPedido() {
    const tipoPedido = this.mesaActiva ? 'LOCAL' : 'DELIVERY';
    const idMesa = this.mesaActiva ? this.mesaActiva.idMesa : null;

    if (this.items.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Carrito Vacío',
        text: '¡Agregá productos primero antes de confirmar!',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    // Si es Delivery (Cliente), mostramos el modal bonito de Login Social
    if (tipoPedido === 'DELIVERY') {
      Swal.fire({
        title: '¡Ya casi terminamos!',
        html: `
          <p class="mb-4 text-muted">Para confirmar tu delivery y pagar con MercadoPago, necesitás iniciar sesión rápido.</p>
          <div class="d-flex flex-column gap-3">
            <button id="btn-google" class="btn btn-outline-dark d-flex align-items-center justify-content-center p-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="24" class="me-2">
              Continuar con Google
            </button>
            <button id="btn-fb" class="btn btn-primary d-flex align-items-center justify-content-center p-2">
              <i class="fab fa-facebook-f me-2"></i> Continuar con Facebook
            </button>
          </div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        didOpen: () => {
          const btnGoogle = document.getElementById('btn-google');
          const btnFb = document.getElementById('btn-fb');

          // Al clickear cualquiera, cerramos el modal y procesamos el pedido
          btnGoogle?.addEventListener('click', () => {
            Swal.close();
            this.procesarPedidoEnBackend(idMesa, tipoPedido);
          });
          btnFb?.addEventListener('click', () => {
            Swal.close();
            this.procesarPedidoEnBackend(idMesa, tipoPedido);
          });
        }
      });
    } else {
      // Si es de Mesa (Mozo), procesamos directamente
      this.procesarPedidoEnBackend(idMesa, tipoPedido);
    }
  }

  private procesarPedidoEnBackend(idMesa: number | null, tipoPedido: string) {
    const detallesBackend = this.items.map(item => ({
      idProducto: item.idProducto,
      cantidad: item.cantidad,
      precioUnitario: item.precio
    }));

    this.pedidoService.crearPedido(idMesa, tipoPedido, detallesBackend).subscribe({
      next: (resPedido) => {
        const idPedido = resPedido.pedido.idPedido;

        if (tipoPedido === 'DELIVERY') {
          // Si es Delivery, lo mandamos a pagar por MercadoPago
          Swal.fire({
            title: 'Generando link de pago...',
            text: 'Aguardá un instante por favor',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          this.pagoService.crearPreferenciaPago(idPedido).subscribe({
            next: (resPago) => {
              this.carritoService.limpiarCarrito();
              // redirigir al cliente a MercadoPago
              window.location.href = resPago.init_point;
            },
            error: (err) => {
              const mensajeError = err.error?.message || err.message || 'Error desconocido';
              Swal.fire('Error al procesar pago', mensajeError, 'error');
              this.carritoService.limpiarCarrito();
            }
          });

        } else {
          // Si es Local (Mesa), el pedido se carga en la cuenta de la mesa
          Swal.fire({
            icon: 'success',
            title: '¡Pedido Confirmado!',
            text: `El pedido fue enviado a la cocina.`,
            confirmButtonColor: '#ffc107'
          });
          this.carritoService.limpiarCarrito();
          this.router.navigate(['/mesa']);
        }
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo crear el pedido: ' + err.message, 'error');
      }
    });
  }
}
