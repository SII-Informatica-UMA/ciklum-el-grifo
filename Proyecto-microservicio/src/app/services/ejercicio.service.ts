import { Observable } from "rxjs";
import { EjerciciosFakeService } from "./ejercicios.fake.service";
import { Ejercicio } from '../entities/ejercicio';
import { Injectable } from '@angular/core';
import { EjerciciosDBService } from "./ejercicios.db.service";
import { UsuariosService } from "./usuarios.service";

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService{

  // CAMBIAR EjerciciosFakeService POR EjerciciosDBService
  constructor(private ejercicio: EjerciciosDBService,private usuarioService: UsuariosService){}

  getEjercicios(): Observable<Ejercicio[]>{
    let entrenadorId = this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error('No se pudo obtener el ID del usuario');
    }
    return this.ejercicio.getEjercicios(entrenadorId);
  }

  addEjercicios(ejercicio: Ejercicio): Observable<Ejercicio>{
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.ejercicio.postEjercicio(ejercicio,entrenadorId);
  }

  editarEjercicios(ejercicio: Ejercicio): Observable<Ejercicio> {
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.ejercicio.putEjercicio(ejercicio.id,ejercicio,entrenadorId);
  }

  eliminarEjercicios(id: number): Observable<void> {
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.ejercicio.deleteEjercicio(id,entrenadorId);
  }

  getEjercicioPorId(id: number):Observable<Ejercicio>  {
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.ejercicio.getEjercicio(id,entrenadorId);
  }

}