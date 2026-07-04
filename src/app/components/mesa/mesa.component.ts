import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MesaService } from '../../services/mesa.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesa.component.html',
  styleUrl: './mesa.component.css',
})
export class MesaComponent implements OnInit {
  mesas: any[] = [];

  nuevaMesa = {
    numMesa: null,
    capacidad: null
  };

  esAdmin: boolean = false;

  constructor(
    private mesaService: MesaService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private carritoService: CarritoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.esAdmin = this.authService.tienePermiso('gestionar_usuarios');
    this.cargarMesas();
  }
  atenderMesa(idMesa: number, numMesa: number): void {
    // guardamos la mesa seleccionada en el estado global (Carrito)
    this.carritoService.setMesa(idMesa, numMesa);

    // navegamos al layout de pedidos (defecto platos)
    this.router.navigate(['/platos']);
  }

  cargarMesas(): void {
    this.mesaService.getMesas().subscribe({
      next: (data) => {
        this.mesas = data.sort((a: any, b: any) => a.numMesa - b.numMesa);
        this.cdr.detectChanges();
      },
      error: (error) => console.error(error)
    });
  }

  crearMesa(): void {
    if (!this.nuevaMesa.numMesa || !this.nuevaMesa.capacidad) {
      Swal.fire('Atención', 'Por favor complete todos los campos.', 'warning');
      return;
    }

    this.mesaService.crearMesa(this.nuevaMesa as any).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Mesa creada correctamente.', 'success');
        this.nuevaMesa = { numMesa: null, capacidad: null };
        this.cargarMesas();
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || "Error al crear la mesa.", 'error');
      }
    });
  }

  cambiarEstado(idMesa: number, estadoActual: string): void {
    // si esta libre, la pasamos a ocupada. si esta ocupada, a libre
    const nuevoEstado = estadoActual === 'LIBRE' ? 'OCUPADA' : 'LIBRE';

    this.mesaService.cambiarEstado(idMesa, nuevoEstado).subscribe({
      next: () => this.cargarMesas(),
      error: (err) => Swal.fire('Error', err.error?.message || "Error al cambiar estado", 'error')
    });
  }

  liberarMesa(idMesa: number): void {
    Swal.fire({
      title: '¿Liberar Mesa?',
      text: '¿Confirmás que el cliente ya pagó y se retiró? La mesa quedará LIBRE.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, liberar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mesaService.liberarMesa(idMesa).subscribe({
          next: () => this.cargarMesas(),
          error: (err) => Swal.fire('Error', err.error?.message || "Error al liberar la mesa", 'error')
        });
      }
    });
  }

  eliminarMesa(idMesa: number): void {
    Swal.fire({
      title: '¿Eliminar Mesa?',
      text: '¿Estás seguro que querés eliminar esta mesa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mesaService.eliminarMesa(idMesa).subscribe({
          next: () => {
            Swal.fire('¡Eliminada!', 'Mesa eliminada.', 'success');
            this.cargarMesas();
          },
          error: (err) => Swal.fire('Error', err.error?.message || "Error al eliminar la mesa.", 'error')
        });
      }
    });
  }
}
