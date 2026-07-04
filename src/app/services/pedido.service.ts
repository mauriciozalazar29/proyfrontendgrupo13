import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api/pedidos';
  private detallesUrl = 'http://localhost:3000/api/detalles-pedidos';

  constructor(private http: HttpClient) { }

  crearPedido(idMesa: number | null, tipoPedido: string, detalles: any[]): Observable<any> {
    const payload: any = { idMesa, tipoPedido, detalles };
    return this.http.post(this.apiUrl, payload);
  }

  obtenerPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerPedidosCocina(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cocina`);
  }

  obtenerPedidoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  cambiarEstado(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  cancelarPedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
