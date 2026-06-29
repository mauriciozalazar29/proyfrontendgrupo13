import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  // objetos de prueba para el servicio
  private productos: Producto[] = [
    {
      idProducto: 1,
      nombre: 'Milanesa napolitana',
      precio: 8500,
      imagen: 'https://imgs.search.brave.com/hBVw3BoG0NIV9NOJtQ__8QKlE4VSAuduS3f0Ak8TysM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVjZXRhcy1hcmdl/bnRpbmFzLmNvbS9i/YXNlL3N0b2NrL1Jl/Y2lwZS9taWxhbmVz/YS1hLWxhLW5hcG9s/aXRhbmEvbWlsYW5l/c2EtYS1sYS1uYXBv/bGl0YW5hX3dlYi5q/cGcud2VicA',
      categoria: 'Almuerzo',
      stock: 10,
    },
    {
      idProducto: 2,
      nombre: 'Locro norteño',
      precio: 7200,
      imagen: 'https://imgs.search.brave.com/Qg0qdh0reGCY3dQTUOEelNlAJJEnIqsmFxGmR3uqG_A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50eWNzcG9ydHMu/Y29tL2ZpbGVzLzIw/MjYvMDQvMjkvOTQ1/MjIzL2xvY3JvLWRl/bC0xLWRlLW1heTBf/NDE2eDIzNC53ZWJw/P3Y9MQ',
      categoria: 'Almuerzo',
      stock: 6,
    },
    {
      idProducto: 3,
      nombre: 'Ensalada Cesar',
      precio: 5200,
      imagen: 'https://imgs.search.brave.com/omklrH-An8M9r_T2UT3my0gtotr-rAL8tqEnfmKncf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5haXJlZGVzYW50/YWZlLmNvbS5hci9w/L2IyNTFlZjIzY2My/YzM3YWNkZTg2NTdi/ODkwZWNlYTFlL2Fk/anVudG9zLzI2OC9p/bWFnZW5lcy8wMDMv/Nzc4LzAwMDM3Nzg0/NzMvMTIwMHgwL3Nt/YXJ0L2ltYWdlcG5n/LnBuZw',
      categoria: 'Desayuno',
      stock: 15,
    },
    {
      idProducto: 4,
      nombre: 'Pizza Muzzarella',
      precio: 10500,
      imagen: 'https://imgs.search.brave.com/8AgBMWUXJ5qpcgY_W3MVADhgDSdzkwK630Ck1xUh0RA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zYWJv/cmFyZ2VudG8uY29t/LmFyL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzA5L1JlY2V0/YS1kZS1QaXp6YS1N/dXp6YXJlbGxhLmpw/Zw',
      categoria: 'Cena',
      stock: 7,
    },
    // =================
  ]
  obtenerProductos() {
    return this.productos;
  }
}
