import { Injectable } from '@angular/core';
import { Ejercicio } from '../entities/ejercicio';

@Injectable({
  providedIn: 'root'
})

export class EjerciciosService {

  private ejercicios: Ejercicio [] = [
    {id: 1, nombre: 'Parte pecho', descripcion: 'Pechito de fuego', tipo: 'perez@uma.es', musculosTrabajados: 'brazo',dificultad: 'difícil',material: `Homero`,multimedia:'https://www.youtube.com/watch?v=-uEwcXUu-CU'},
    {id: 2, nombre: 'Culo insano', descripcion: 'Let him cook', tipo: 'ana@uma.es', musculosTrabajados: 'culo'},
    {id: 3, nombre: 'Wango', descripcion: 'Ulti estelar', tipo: 'gonzalez@uma.es', musculosTrabajados: 'pierna'},
  ];

  constructor() { }

  getEjercicios(): Ejercicio[] {
    return this.ejercicios.sort((a, b) => {
        return a.id - b.id;
    });
}

  addEjercicios(ejercicos: Ejercicio) {
    ejercicos.id = Math.max(...this.ejercicios.map(c => c.id)) + 1;
    this.ejercicios.push(ejercicos);
  }

  editarEjercicios(ejercicos: Ejercicio) {
    let indice = this.ejercicios.findIndex(c => c.id == ejercicos.id);
    this.ejercicios[indice] = ejercicos;
  }

  eliminarEjercicios(id: number) {
    let indice = this.ejercicios.findIndex(c => c.id == id);
    this.ejercicios.splice(indice, 1);
  }
}
