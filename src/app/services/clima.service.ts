import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private readonly CACHE_KEY = 'weather_jujuy_data';
  private readonly CACHE_TIME_KEY = 'weather_jujuy_time';
  private readonly CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutos

  constructor(private http: HttpClient) { }

  obtenerClimaActual(): Observable<any> {
    const cachedWeather = localStorage.getItem(this.CACHE_KEY);
    const cachedTime = localStorage.getItem(this.CACHE_TIME_KEY);

    if (cachedWeather && cachedTime) {
      const timePassed = new Date().getTime() - parseInt(cachedTime, 10);
      if (timePassed < this.CACHE_DURATION_MS) {
        // Devolver datos cacheados envueltos en un Observable
        return of(JSON.parse(cachedWeather));
      }
    }

    const url = 'https://yahoo-weather5.p.rapidapi.com/weather?location=jujuy&format=json&u=c';
    const headers = new HttpHeaders({
      'x-rapidapi-key': '70889bd22bmshb9f83a922241315p1818f0jsn5cd39c90989d',
      'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    });

    return this.http.get(url, { headers }).pipe(
      tap((data: any) => {
        const observation = data.current_observation;
        const climaData = {
          temperature: observation.condition.temperature,
          code: observation.condition.code
        };
        // Guardar en caché local
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(climaData));
        localStorage.setItem(this.CACHE_TIME_KEY, new Date().getTime().toString());
      }),
      // Si la API falla pero tenemos caché, enviamos la caché vieja
      catchError((error) => {
        if (cachedWeather) {
          return of(JSON.parse(cachedWeather));
        }
        throw error;
      })
    );
  }
}
