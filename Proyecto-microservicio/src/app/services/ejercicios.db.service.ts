import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { BACKEND_URI } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { Ejercicio } from "../entities/ejercicio";

@Injectable({
    providedIn: 'root'
  })
  export class EjerciciosDBService {

    constructor(private httpClient: HttpClient) {}

  
    getEjercicios(entrenadorId: number): Observable<Ejercicio[]> {
      return this.httpClient.get<Ejercicio[]>(`${BACKEND_URI}/ejercicio?entrenador=${entrenadorId}`);
    }


    postEjercicio(Ejercicio: Ejercicio,entrenadorId: number): Observable<Ejercicio> {
      return this.httpClient.post<Ejercicio>(`${BACKEND_URI}/ejercicio?entrenador=${entrenadorId}`, Ejercicio);
    }


  putEjercicio(idEjercicio: number, Ejercicio: Ejercicio,entrenadorId: number): Observable<Ejercicio> {
      return this.httpClient.put<Ejercicio>(`${BACKEND_URI}/ejercicio/${idEjercicio}?entrenador=${entrenadorId}`, Ejercicio);
}

deleteEjercicio(idEjercicio: number,entrenadorId: number): Observable<void> {
      return this.httpClient.delete<void>(`${BACKEND_URI}/ejercicio/${idEjercicio}?entrenador=${entrenadorId}`);
 
}

  getEjercicio(idEjercicio: number,entrenadorId: number): Observable<Ejercicio> {
      return this.httpClient.get<Ejercicio>(`${BACKEND_URI}/ejercicio/${idEjercicio}?entrenador=${entrenadorId}`);
}
  }
