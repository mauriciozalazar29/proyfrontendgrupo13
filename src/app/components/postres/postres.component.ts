import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-postres',
  imports: [CommonModule, FormsModule],
  templateUrl: './postres.component.html',
  styleUrl: './postres.component.css',
})
export class PostresComponent implements OnInit{

  constructor(private listaProductos: ProductoService) { }
  
  postres: Producto[] = [];

  ngOnInit() {
    
    this.postres = this.listaProductos.obtenerPostres();
  }

}
