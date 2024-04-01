import { Injectable } from '@angular/core';
import { Ejercicio } from './ejercicio';

@Injectable({
  providedIn: 'root'
})

export class EjercicosService {

  private ejercicios: Ejercicio [] = [
    {id: 1, nombre: 'Parte pecho', descripcion: 'Pechito de fuego', tipo: 'perez@uma.es', musculosTrabajados: 'brazo'},
    {id: 2, nombre: 'Culo insano', descripcion: 'Let him cook', tipo: 'ana@uma.es', musculosTrabajados: 'culo'},
    {id: 3, nombre: 'Wango', descripcion: 'Ulti estelar', tipo: 'gonzalez@uma.es', musculosTrabajados: 'pierna'},
  ];

  constructor() { }

  getEjercicos(): Ejercicio[] {
    return this.ejercicios.sort((a, b) => {
        return a.id - b.id;
    });
}

  addEjercicos(ejercicos: Ejercicio) {
    ejercicos.id = Math.max(...this.ejercicios.map(c => c.id)) + 1;
    this.ejercicios.push(ejercicos);
  }

  editarEjercicos(ejercicos: Ejercicio) {
    let indice = this.ejercicios.findIndex(c => c.id == ejercicos.id);
    this.ejercicios[indice] = ejercicos;
  }

  eliminarEjercicos(id: number) {
    let indice = this.ejercicios.findIndex(c => c.id == id);
    this.ejercicios.splice(indice, 1);
  }
}
