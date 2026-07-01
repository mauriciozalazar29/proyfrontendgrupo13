import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-postres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postres.component.html',
  styleUrl: './postres.component.css',
})
export class PostresComponent implements OnInit{
  postres: Producto[] = [];

  constructor(
    private listaProductos: ProductoService,
    private carritoService: CarritoService,
    private cdr: ChangeDetectorRef
  ) { }
  
  ngOnInit() {
    this.listaProductos.obtenerProductos('postre').subscribe({
      next: (data) => {
        this.postres = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error cargando postres", err)
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }
}
