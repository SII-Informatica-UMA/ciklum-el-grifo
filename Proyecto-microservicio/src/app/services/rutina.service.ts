import { Injectable } from '@angular/core';
import { Rutina } from '../entities/rutina';

@Injectable({
  providedIn: 'root'
})

export class RutinasService {
  private rutinas: Rutina [] = [
    {id: 1, nombre: 'Rutina 1', descripcion: 'Rutina descrip', observaciones: 'Rutina obs', ejercicios: []},
    {id: 2, nombre: 'Rutina 2', descripcion: 'Rutina descrip', observaciones: 'Rutina obs', ejercicios: []},
    {id: 3, nombre: 'Rutina 3', descripcion: 'Rutina descrip', observaciones: 'Rutina obs', ejercicios: []},
  ];

  constructor() { }

  getRutinas(): Rutina[] {
    return this.rutinas.sort((a, b) => {
        return a.id - b.id;
    });
}


  addRutinas(rutinas: Rutina) {
    rutinas.id = Math.max(...this.rutinas.map(c => c.id)) + 1;
    this.rutinas.push(rutinas);
  }

  editarRutinas(rutinas: Rutina) {
    let indice = this.rutinas.findIndex(c => c.id == rutinas.id);
    this.rutinas[indice] = rutinas;
  }

  eliminarRutinas(id: number) {
    let indice = this.rutinas.findIndex(c => c.id == id);
    this.rutinas.splice(indice, 1);
  }

  getRutinaPorId(id: number): Rutina | undefined {
    return this.rutinas.find(rutina => rutina.id === id);
  }


}
