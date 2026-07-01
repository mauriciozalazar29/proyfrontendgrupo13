import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  //coneccion a la api local
  urlApi: string = "http://localhost:3000/api/usuario/";

  constructor(private http: HttpClient) { }

  //Metodo para traer lista de Uusarios
  public getUsuarios(): Observable<any> {
    let HttpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this.http.get<any>(this.urlApi, HttpOptions);
  }

  getGenerico(): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': '',
        'x-rapidapi-host': '',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('', httpOptions);  
    
  }

  postGenerico(): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': '',
        'x-rapidapi-host': '',
        'Content-Type': 'application/json'
      })
    };

    let body = {

    };
    return this.http.post('', body, httpOptions);  
    
  }

}
