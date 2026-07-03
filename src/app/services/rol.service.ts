import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlApi: string = "http://localhost:3000/api/roles/";

  constructor(private http: HttpClient) { }

  public getRoles(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

}
