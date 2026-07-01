import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MesaService } from '../../services/mesa.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [],
  template: `<div class="d-flex justify-content-center align-items-center vh-100 text-white">
                <h4>Escaneando Mesa...</h4>
             </div>`,
})
export class QrComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mesaService: MesaService,
    private carritoService: CarritoService
  ) { }

  ngOnInit() {
    // Leemos el idMesa de la URL
    const idMesaStr = this.route.snapshot.paramMap.get('idMesa');

    if (idMesaStr) {
      const idMesa = parseInt(idMesaStr, 10);

      // Buscamos la mesa en el backend para asegurarnos que exista y obtener su número
      this.mesaService.obtenerMesaPorId(idMesa).subscribe({
        next: (mesa) => {
          // Guardamos la mesa en el carrito usando la función correcta
          this.carritoService.setMesa(mesa.idMesa, mesa.numMesa);
          // Redirigimos al cliente al menú de platos
          this.router.navigate(['/platos']);
        },
        error: (err) => {
          alert('Mesa no encontrada o inactiva.');
          this.router.navigate(['/']);
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
