import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CajaService } from '../../services/caja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.css'
})
export class CajaComponent implements OnInit {
  cajaActiva: any = null;
  montoInicial: number = 0;

  // variable para ROL 
  esAdminOCajero: boolean = true;

  constructor(private cajaService: CajaService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.verificarCaja();
  }

  verificarCaja(): void {
    this.cajaService.obtenerCajaActiva().subscribe({
      next: (data) => {
        this.cajaActiva = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        // si tira 404 significa que no hay caja abierta
        if (err.status === 404) {
          this.cajaActiva = null;
          this.cdr.detectChanges();
        } else {
          console.error("Error al obtener caja:", err);
        }
      }
    });
  }

  abrirCaja(): void {
    if (this.montoInicial < 0) {
      Swal.fire('Error', 'El monto no puede ser negativo', 'error');
      return;
    }

    this.cajaService.abrirCaja(this.montoInicial).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Caja abierta exitosamente', 'success');
        this.verificarCaja();
      },
      error: (err) => Swal.fire('Error', err.error?.message || "Error al abrir la caja", 'error')
    });
  }

  cerrarCaja(): void {
    Swal.fire({
      title: '¿Cerrar Caja?',
      text: '¿Estas seguro que queres cerrar la caja del turno?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cajaService.cerrarCaja().subscribe({
          next: (res) => {
            Swal.fire('Caja Cerrada', `Monto final: $${res.caja.montoFinal}`, 'info');
            this.verificarCaja();
          },
          error: (err) => Swal.fire('Error', err.error?.message || "Error al cerrar la caja", 'error')
        });
      }
    });
  }

  descargarPDF(idCaja: number): void {
    window.open(`https://proybackendgrupo13-9bp9.onrender.com/api/reportes/caja/${idCaja}/pdf`, '_blank');
  }

  descargarExcel(idCaja: number): void {
    window.open(`https://proybackendgrupo13-9bp9.onrender.com/api/reportes/caja/${idCaja}/excel`, '_blank');
  }
}
