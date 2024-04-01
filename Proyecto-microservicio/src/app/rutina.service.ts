import { Injectable } from '@angular/core';
import { Rutina } from './rutina';

@Injectable({
  providedIn: 'root'
})

export class RutinasService {
  private rutinas: Rutina [] = [
    {id: 1, nombre: 'Juan', apellidos: 'Pérez', email: 'perez@uma.es', telefono: '666666666'},
    {id: 2, nombre: 'Ana', apellidos: 'García', email: 'ana@uma.es', telefono: '55555555'},
    {id: 3, nombre: 'Luis', apellidos: 'González', email: 'gonzalez@uma.es', telefono: '444444444'},
  ];

  constructor() { }

  getRutinas(): Rutina [] {
    return this.rutinas.sort((a,b)=>a.nombre.localeCompare(b.nombre));;
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
