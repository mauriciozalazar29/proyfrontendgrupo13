import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:3000/api/pagos';

  constructor(private http: HttpClient) { }

  crearPreferenciaPago(idPedido: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      idPedido: idPedido,
      metodoPago: 'MERCADOPAGO'
    });
  }
}
