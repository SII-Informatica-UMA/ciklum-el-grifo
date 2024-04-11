import { Injectable } from '@angular/core';
import { Rutina } from '../entities/rutina';
import { RutinasFakeService } from './rutinas.fake.service';
import { Observable, of } from "rxjs";
import { RutinasDBService } from './rutinas.db.services';
import { UsuariosService } from "./usuarios.service"
@Injectable({
  providedIn: 'root'
})

export class RutinasService {
  
  //CAMBIAR A RutinasDBService PARA USAR BACKEND O RutinasFakeService PARA USAR LOCAL
  constructor(private rutina:RutinasDBService,private usuarioService: UsuariosService) { }

  getRutinas(): Observable<Rutina[]> {
    let entrenadorId = this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error('No se pudo obtener el ID del usuario');
    }
    return this.rutina.getRutinas(entrenadorId);
  }
  

  addRutinas(rutina: Rutina): Observable<Rutina>{
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.rutina.postRutina(rutina,entrenadorId);
  }

  editarRutinas(rutina: Rutina): Observable<Rutina> {
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.rutina.putRutina(rutina.id,rutina,entrenadorId);
  }

  eliminarRutinas(id: number): Observable<void> {
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.rutina.deleteRutina(id,entrenadorId);
  }

  getRutinaPorId(id: number): Observable<Rutina>  {
    let entrenadorId= this.usuarioService.getUsuarioActualId();
    if (entrenadorId === null) {
      throw new Error ('No se pudo obtener el ID del usuario');
    }
    return this.rutina.getRutina(id,entrenadorId);
  }


}
