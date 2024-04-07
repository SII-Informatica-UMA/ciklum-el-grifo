import { Injectable } from '@angular/core';
import { Ejercicio } from './ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioRutinaService {

  private ejerciciosRutina: Map<number, Ejercicio[]> = new Map<number, Ejercicio[]>();

  constructor() { }

  // Devuelve una copia ordenada de los ejercicios de la rutina
  getEjerciciosRutina(rutinaId: number): Ejercicio[] {
    return this.ejerciciosRutina.get(rutinaId) || [];
  }
 
  // Añade un ejercicio a la lista de ejercicios de la rutina
  addEjerciciosRutina(rutinaId: number, ejercicio: Ejercicio): void {
    let ejercicios = this.ejerciciosRutina.get(rutinaId) || [];
    ejercicios.push(ejercicio);
    this.ejerciciosRutina.set(rutinaId, ejercicios);
  }

  // Edita un ejercicio de la lista de ejercicios de la rutina
  editarEjercicios(rutinaId: number, ejercicio: Ejercicio): void {
    let ejercicios = this.ejerciciosRutina.get(rutinaId) || [];
    let indice = ejercicios.findIndex(c => c.id == ejercicio.id);
    if (indice !== -1) {
      ejercicios[indice] = ejercicio;
      this.ejerciciosRutina.set(rutinaId, ejercicios);
    }
  }

  // Elimina un ejercicio de la lista de ejercicios de la rutina
  eliminarEjercicios(rutinaId: number, id: number): void {
    let ejercicios = this.ejerciciosRutina.get(rutinaId) || [];
    let indice = ejercicios.findIndex(c => c.id == id);
    if (indice !== -1) {
      ejercicios.splice(indice, 1);
      this.ejerciciosRutina.set(rutinaId, ejercicios);
    }
  }
}
