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

  getRutina(id: number): Observable<Rutina> {
    return this.httpClient.get<Rutina>(BACKEND_URI + '/rutina'+id);
  }

  putRutina(rutina: Rutina): Observable<Rutina> {
    return this.httpClient.put<Rutina>(BACKEND_URI + '/rutina/' + rutina.id, rutina);
  }

  deleteRutina(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/rutina/' + id);
  }
  
  getRutinas(): Observable<Rutina[]> {
    return this.httpClient.get<Rutina[]>(BACKEND_URI + '/rutina');
  }

  postRutina(rutina: Rutina): Observable<Rutina> {
    return this.httpClient.post<Rutina>(BACKEND_URI + '/rutina', rutina);
  }


  
  }
