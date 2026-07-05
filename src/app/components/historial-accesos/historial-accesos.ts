import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-historial-accesos',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './historial-accesos.html',
  styleUrl: './historial-accesos.css'
})
export class HistorialAccesos implements OnInit {
  historial: any[] = [];
  cargando: boolean = true;
  error: string = '';
  
  private apiUrl = 'https://proybackendgrupo13-9bp9.onrender.com/api/historial';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.cargando = true;
    
    // Configurar headers con el token (usualmente lo haria un interceptor, pero por simplicidad lo armamos manual si hace falta)
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.historial = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando historial', err);
        this.error = 'No se pudo cargar el historial de accesos';
        this.cargando = false;
      }
    });
  }
}
