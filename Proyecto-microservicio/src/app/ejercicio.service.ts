import { Injectable } from '@angular/core';
import { Ejercicio } from './ejercicio';

@Injectable({
  providedIn: 'root'
})

export class EjercicosService {
  private ejercicos: Ejercicio [] = [];

  constructor() { }

  getEjercicos(): Ejercicio[] {
    return this.ejercicos.sort((a, b) => {
        return a.id - b.id;
    });
}

  addEjercicos(ejercicos: Ejercicio) {
    ejercicos.id = Math.max(...this.ejercicos.map(c => c.id)) + 1;
    this.ejercicos.push(ejercicos);
  }

  editarEjercicos(ejercicos: Ejercicio) {
    let indice = this.ejercicos.findIndex(c => c.id == ejercicos.id);
    this.ejercicos[indice] = ejercicos;
  }

  eliminarEjercicos(id: number) {
    let indice = this.ejercicos.findIndex(c => c.id == id);
    this.ejercicos.splice(indice, 1);
  }
}
