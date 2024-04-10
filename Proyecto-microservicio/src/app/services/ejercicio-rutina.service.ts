import { Injectable } from '@angular/core';
import { Ejercicio } from '../entities/ejercicio';
import { EjercicioDetalles } from '../entities/rutina';

@Injectable({
  providedIn: 'root'
})
export class EjercicioRutinaService {

  private ejerciciosRutina: Map<number, EjercicioDetalles[]> = new Map<number, EjercicioDetalles[]>();

  constructor() { }

  // Devuelve una copia ordenada de los ejercicios de la rutina
  getEjerciciosRutina(rutinaId: number): EjercicioDetalles[] {
    return this.ejerciciosRutina.get(rutinaId) || [];
  }
 
  // Añade un ejercicio a la lista de ejercicios de la rutina
  addEjerciciosRutina(rutinaId: number, ejercicio: EjercicioDetalles): void {
    let ejercicios = this.ejerciciosRutina.get(rutinaId) || [];
    ejercicios.push(ejercicio);
    this.ejerciciosRutina.set(rutinaId, ejercicios);
  }

  // Edita un ejercicio de la lista de ejercicios de la rutina
  editarEjercicios(rutinaId: number, ejercicioDetalles: EjercicioDetalles): void {
    let ejercicios = this.ejerciciosRutina.get(rutinaId) || [];
    let indice = ejercicios.findIndex(c => c.ejercicio.id == ejercicioDetalles.ejercicio.id);
    if (indice !== -1) {
      ejercicios[indice] = ejercicioDetalles;
      this.ejerciciosRutina.set(rutinaId, ejercicios);
    }
  }

  // Elimina un ejercicio de la lista de ejercicios de la rutina
  eliminarEjercicios(rutinaId: number, id: number): void {
    let ejercicios = this.ejerciciosRutina.get(rutinaId) || [];
    let indice = ejercicios.findIndex(c => c.ejercicio.id == id);
    if (indice !== -1) {
      ejercicios.splice(indice, 1);
      this.ejerciciosRutina.set(rutinaId, ejercicios);
    }
  }

  // Elimina la lista de ejercicios de la rutina
  eliminarRutina(rutinaId: number){
    this.getEjerciciosRutina(rutinaId).splice(0, this.ejerciciosRutina.size);
    this.ejerciciosRutina.delete(rutinaId);
  }

}
