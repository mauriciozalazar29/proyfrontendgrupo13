import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocinaService } from '../../services/cocina.service';
@Component({
  selector: 'app-cocina',
  imports: [CommonModule],
  templateUrl: './cocina.component.html',
  styleUrl: './cocina.component.css',
})
export class CocinaComponent implements OnInit {
  comandas: any[] = [];

  constructor(private cocinaService: CocinaService) {}

  ngOnInit() {
    this.cargarComandas();
  }

  cargarComandas() {
    this.cocinaService.obtenerComidas().subscribe(res => {
      this.comandas = res;
    });
  }

  // Función para filtrar bebidas en la vista
  esComida(categoria: string): boolean {
    return categoria !== 'bebida';
  }

  cambiarEstado(id: number, estado: string) {
    this.cocinaService.actualizarEstadoCocina(id, estado).subscribe(() => {
      this.cargarComandas(); // Refrescar lista
    });
  }
}
