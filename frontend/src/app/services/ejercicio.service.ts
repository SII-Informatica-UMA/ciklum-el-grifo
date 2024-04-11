import { Injectable } from '@angular/core';
import { Ejercicio } from '../entities/ejercicio';

@Injectable({
  providedIn: 'root'
})

export class EjerciciosService {

  private ejercicios: Ejercicio [] = [
    {id: 1, nombre: 'Ejercicio 1', descripcion: 'Ejercicio texto ', observaciones: 'Ejercicio comment', tipo: 'pecho', musculosTrabajados: 'brazo',dificultad: 'difícil',material: `Homero`,multimedia:'https://www.youtube.com/'},
    {id: 2, nombre: 'Ejercicio 2 ', descripcion: 'Ejercicio texto', observaciones: 'Ejercicio comment', tipo: 'glúteo', musculosTrabajados: 'culo'},
    {id: 3, nombre: 'Ejercicio 3', descripcion: 'Ejercicio texto', observaciones: 'Ejercicio comment', tipo: 'persona', musculosTrabajados: 'pierna'},
  ];
 
  constructor() { }

  getEjercicios(): Ejercicio[] {
    return this.ejercicios.sort((a, b) => {
        return a.id - b.id;
    });
}

getEjercicioPorId(id: number): Ejercicio | undefined {
  return this.ejercicios.find(ejercicio => ejercicio.id === id);
}

  addEjercicios(ejercicios: Ejercicio) {
    ejercicios.id = Math.max(...this.ejercicios.map(c => c.id)) + 1;
    this.ejercicios.push(ejercicios);
  }

  editarEjercicios(ejercicios: Ejercicio) {
    let indice = this.ejercicios.findIndex(c => c.id == ejercicios.id);
    this.ejercicios[indice] = ejercicios;
  }

  eliminarEjercicios(id: number) {
    let indice = this.ejercicios.findIndex(c => c.id == id);
    this.ejercicios.splice(indice, 1);
  }
}
