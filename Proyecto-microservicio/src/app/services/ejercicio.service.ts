import { Observable } from "rxjs";
import { EjerciciosFakeService } from "./ejercicios.fake.service";
import { Ejercicio } from '../entities/ejercicio';
import { Injectable } from '@angular/core';
import { EjerciciosDBService } from "./ejercicios.db.service";

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService{

  // CAMBIAR EjerciciosFakeService POR EjerciciosDBService
  constructor(private ejercicio: EjerciciosFakeService){}

  getEjercicios(): Observable<Ejercicio[]>{
    return this.ejercicio.getEjercicios();
  }

  addEjercicios(ejercicio: Ejercicio): Observable<Ejercicio>{
    return this.ejercicio.postEjercicio(ejercicio);
  }

  editarEjercicios(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.ejercicio.putEjercicio(ejercicio);
  }

  eliminarEjercicios(id: number): Observable<void> {
    
    return this.ejercicio.deleteEjercicio(id);
  }

  getEjercicioPorId(id: number):Observable<Ejercicio>  {
    return this.ejercicio.getEjercicio(id);
  }

}