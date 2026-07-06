import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  clima: any = null;
  iconoClima: string = 'thermostat';
  descripcionClima: string = 'Cargando clima...';

  constructor(
    private router: Router, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.obtenerClima();
  }

  obtenerClima() {
    // Coordenadas de San Salvador de Jujuy
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-24.1833&longitude=-65.3313&current_weather=true';
    
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.clima = data.current_weather;
        this.interpretarClima(this.clima.weathercode);
        this.cdr.detectChanges(); // Forzamos a Angular a actualizar la pantalla
      },
      error: (err) => {
        console.error('Error obteniendo clima:', err);
        this.descripcionClima = 'Clima no disponible';
        this.iconoClima = 'cloud_off';
        this.cdr.detectChanges();
      }
    });
  }

  interpretarClima(code: number) {
    if (code === 0) {
      this.iconoClima = 'sunny';
      this.descripcionClima = '¡Día espectacular para comer al aire libre!';
    } else if (code >= 1 && code <= 3) {
      this.iconoClima = 'partly_cloudy_day';
      this.descripcionClima = 'Lindo día para unas hamburguesas.';
    } else if (code >= 45 && code <= 48) {
      this.iconoClima = 'foggy';
      this.descripcionClima = 'Poca visibilidad, mejor pedir delivery.';
    } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      this.iconoClima = 'rainy';
      this.descripcionClima = 'Día lluvioso... ¡ideal para pedir delivery!';
    } else if (code >= 71 && code <= 77) {
      this.iconoClima = 'ac_unit';
      this.descripcionClima = '¡Hace frío! Pedí desde la cama.';
    } else if (code >= 95 && code <= 99) {
      this.iconoClima = 'thunderstorm';
      this.descripcionClima = '¡Tormenta fuerte! Los deliverys pueden demorar.';
    } else {
      this.iconoClima = 'cloud';
      this.descripcionClima = '¡El clima ideal para una buena comida!';
    }
  }

  hacerPedido() {
    this.router.navigate(['/platos']);
  }
}
