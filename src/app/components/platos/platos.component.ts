import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-platos',
  imports: [CommonModule, FormsModule],
  templateUrl: './platos.component.html',
  styleUrl: './platos.component.css',
})
export class PlatosComponent implements OnInit {
  constructor(private listaProductos: ProductoService) { }
  productos: Producto[] = [];
  ngOnInit() {
    // obtener los productos de la lista apenas cargue la pagina
    this.productos = this.listaProductos.obtenerProductos();
  }

}
