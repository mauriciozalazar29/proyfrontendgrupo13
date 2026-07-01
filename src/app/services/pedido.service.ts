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

  crearPedido(idMesa: number, idCliente?: number): Observable<any> {
    const payload: any = { idMesa, tipoPedido: 'LOCAL' };
    if (idCliente) payload.idCliente = idCliente;
    
    return this.http.post(this.apiUrl, payload);
  }

  agregarDetalle(idPedido: number, idProducto: number, cantidad: number, precioUnitario: number): Observable<any> {
    return this.http.post(this.detallesUrl, {
      idPedido,
      idProducto,
      cantidad,
      precioUnitario
    });
  }

  obtenerPedidos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
