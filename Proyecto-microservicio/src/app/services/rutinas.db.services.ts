import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { BACKEND_URI } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { Rutina } from "../entities/rutina";


@Injectable({
    providedIn: 'root'
  })
  export class RutinasDBService {

    constructor(private httpClient: HttpClient) {}
  //-------------------------------------------RUTINAS----------------------------------------------------------

  getRutinas(entrenadorId: number): Observable<Rutina[]> {
    return this.httpClient.get<Rutina[]>(`${BACKEND_URI}/rutina?entrenador=${entrenadorId}`);
  }

  postRutina(rutina: Rutina, entrenadorId: number): Observable<Rutina> {
  return this.httpClient.post<Rutina>(`${BACKEND_URI}/rutina?entrenador=${entrenadorId}`, rutina);
  }

  getRutina(id: number, entrenadorId: number): Observable<Rutina> {
  return this.httpClient.get<Rutina>(`${BACKEND_URI}/rutina/${id}?entrenador=${entrenadorId}`);
  }

  putRutina(id: number, rutina: Rutina, entrenadorId: number): Observable<Rutina> {
  return this.httpClient.put<Rutina>(`${BACKEND_URI}/rutina/${id}?entrenador=${entrenadorId}`, rutina);
  }

  deleteRutina(id: number, entrenadorId: number): Observable<void> {
  return this.httpClient.delete<void>(`${BACKEND_URI}/rutina/${id}?entrenador=${entrenadorId}`);
  }



  
  }
