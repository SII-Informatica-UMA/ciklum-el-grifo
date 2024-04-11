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

  
  getEjercicio(id: number): Observable<Ejercicio> {
    return this.httpClient.get<Ejercicio>(BACKEND_URI + '/ejercicio'+id);
  }

  putEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.httpClient.put<Ejercicio>(BACKEND_URI + '/ejercicio/' + ejercicio.id, ejercicio);
  }

  deleteEjercicio(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/ejercicio/' + id);
  }

  getEjercicios(): Observable<Ejercicio[]> {
    return this.httpClient.get<Ejercicio[]>(BACKEND_URI + '/ejercicio');
  }

  postEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.httpClient.post<Ejercicio>(BACKEND_URI + '/ejercicio', ejercicio);
  }
  }
