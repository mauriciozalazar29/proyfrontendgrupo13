import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesaService } from '../../services/mesa.service';

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

  // variable simulada para el ROL cambiar por un AuthGuard/AuthService
  esAdmin: boolean = true;

  constructor(private mesaService: MesaService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarMesas();
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
      alert("Por favor complete todos los campos.");
      return;
    }

    this.mesaService.crearMesa(this.nuevaMesa as any).subscribe({
      next: () => {
        alert("Mesa creada correctamente.");
        this.nuevaMesa = { numMesa: null, capacidad: null };
        this.cargarMesas();
      },
      error: (err) => {
        alert(err.error?.message || "Error al crear la mesa.");
      }
    });
  }

  cambiarEstado(idMesa: number, estadoActual: string): void {
    // si esta libre, la pasamos a ocupada. si esta ocupada, a libre
    const nuevoEstado = estadoActual === 'LIBRE' ? 'OCUPADA' : 'LIBRE';

    this.mesaService.cambiarEstado(idMesa, nuevoEstado).subscribe({
      next: () => this.cargarMesas(),
      error: (err) => alert(err.error?.message || "Error al cambiar estado")
    });
  }

  eliminarMesa(idMesa: number): void {
    if (confirm("¿Estas seguro que queres eliminar esta mesa?")) {
      this.mesaService.eliminarMesa(idMesa).subscribe({
        next: () => {
          alert("Mesa eliminada.");
          this.cargarMesas();
        },
        error: (err) => alert(err.error?.message || "Error al eliminar la mesa.")
      });
    }
  }
}
