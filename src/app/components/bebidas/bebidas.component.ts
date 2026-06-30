import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bebidas',
  imports: [CommonModule, FormsModule],
  templateUrl: './bebidas.component.html',
  styleUrl: './bebidas.component.css',
})
export class BebidasComponent {

  constructor(private listaProductos: ProductoService) { }

  bebidas: Producto[] = [];

  ngOnInit() {
    // obtener las bebidas de la lista apenas cargue la pagina
    this.bebidas = this.listaProductos.obtenerBebidas();
  }
  
}
