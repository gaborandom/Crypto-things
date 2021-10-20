import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivosResponse } from '../models/activos-response';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivoRaw } from '../models/activo-raw';
import { TotalPortafolio } from '../models/total-portafolio';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {
  SERVER: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {

  }

  getActivos(): Observable<Array<ActivosResponse>> {
    console.log("Enviando petición post para obtener activos.")
    return this.httpClient.post<Array<ActivosResponse>>(
      `${this.SERVER}/getActivos`, {
      accessToken: localStorage.getItem("ACCESS_TOKEN")
    });
  }
  getTop100(): Observable<ActivoRaw> {
    return this.httpClient.get<ActivoRaw>(`${this.SERVER}/getTop100`);
  }
  addActivo(activo: string, cantidad: number): Observable<Array<ActivosResponse>> {
    console.log("Enviando peticion put para añadir activo.")
    return this.httpClient.put<Array<ActivosResponse>>(
      `${this.SERVER}/addActivo`, {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
      activo: activo,
      cantidad: cantidad
    }, { responseType: 'text' as 'json' });
  }
  substractActivo(activo: string, cantidad: number): Observable<Array<ActivosResponse>> {
    console.log("Enviando peticion put para sustraer activo.")
    return this.httpClient.put<Array<ActivosResponse>>(
      `${this.SERVER}/substractActivo`, {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
      activo: activo,
      cantidad: cantidad
    }, { responseType: 'text' as 'json' });
  }

  getPortfolioTotalChart(): Observable<Array<TotalPortafolio>> {
    console.log("Enviando petición post para obtener activos.")
    return this.httpClient.post<Array<TotalPortafolio>>(
      `${this.SERVER}/getPortfolioTotalChart`, {
        accessToken: localStorage.getItem("ACCESS_TOKEN")
    });
  }

  getActivosInfo():  Observable<Array<any>> {
    console.log("Enviando petición post para obtener activos.")
    return this.httpClient.post<Array<TotalPortafolio>>(
      `${this.SERVER}/getActivosInfo`, {
        accessToken: localStorage.getItem("ACCESS_TOKEN")
    });
  }
}
