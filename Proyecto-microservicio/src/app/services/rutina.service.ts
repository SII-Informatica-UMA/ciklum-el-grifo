import { Injectable } from '@angular/core';
import { Rutina } from '../entities/rutina';

@Injectable({
  providedIn: 'root'
})

export class RutinasService {
  private rutinas: Rutina [] = [
    {id: 1, nombre: 'Parte pecho', descripcion: 'Pechito de fuego', observaciones: 'rutina no aconsejable', ejercicios: []},
    {id: 2, nombre: 'Culo insano', descripcion: 'Let him cook', observaciones: 'no apto para gays', ejercicios: []},
    {id: 3, nombre: 'Wango', descripcion: 'Ulti estelar', observaciones: 'venir comio de casa', ejercicios: []},
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
}
