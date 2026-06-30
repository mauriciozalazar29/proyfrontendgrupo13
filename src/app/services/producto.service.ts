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

  //Se crean bjetos estaticos de prueba para el componente bebidas

  private bebidas: Producto[] = [

    {
      idProducto: 5,
      nombre: 'Gaseosa Coca-Cola lata',
      precio: 1800,
      imagen: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop',
      categoria: 'Gaseosas',
      stock: 40,
    },
    {
      idProducto: 6,
      nombre: 'Cerveza Artesanal',
      precio: 3500,
      imagen: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=500&auto=format&fit=crop',
      categoria: 'Cervezas',
      stock: 24,
    },
    {
      idProducto: 7,
      nombre: 'Fernet Branca con Coca',
      precio: 4500,
      imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=500&auto=format&fit=crop',
      categoria: 'Tragos',
      stock: 15,
    },
    {
      idProducto: 8,
      nombre: 'Agua Mineral Sin Gas',
      precio: 1500,
      imagen: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=500&auto=format&fit=crop',
      categoria: 'Aguas',
      stock: 50,
    }

  ]

  obtenerBebidas(){
    return this.bebidas;
  }

// Objetos estáticos de prueba para el componente postres
  private postres: Producto[] = [
    {
      idProducto: 9,
      nombre: 'Volcán de Chocolate',
      precio: 4500,
      imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=500&auto=format&fit=crop',
      categoria: 'Postres Calientes',
      stock: 8,
    },
    {
      idProducto: 10,
      nombre: 'Tiramisú Italiano',
      precio: 4200,
      imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500&auto=format&fit=crop',
      categoria: 'Tortas',
      stock: 12,
    },
    {
      idProducto: 11,
      nombre: 'Cheesecake de Frutos Rojos',
      precio: 4100,
      imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=500&auto=format&fit=crop',
      categoria: 'Tortas',
      stock: 10,
    },
    {
      idProducto: 12,
      nombre: 'Cono de Helado',
      precio: 3800,
      imagen: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=500&auto=format&fit=crop',
      categoria: 'Helados',
      stock: 20,
    }
  ];

  obtenerPostres() {
    return this.postres;
  }
}
