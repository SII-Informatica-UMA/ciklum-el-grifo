import { Injectable } from '@angular/core';
import { Ejercicio } from '../entities/ejercicio';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EjerciciosFakeService {

  private ejercicio: Ejercicio [] = [
    {id: 1, nombre: 'Parte pecho', descripcion: 'Pechito de fuego', observaciones: 'debería mejorar', tipo: 'pecho', musculosTrabajados: 'brazo',dificultad: 'difícil',material: `Homero`,multimedia:'https://www.youtube.com/watch?v=-uEwcXUu-CU'},
    {id: 2, nombre: 'Culo insano', descripcion: 'Let him cook', observaciones: 'bien hecho', tipo: 'glúteo', musculosTrabajados: 'culo'},
    {id: 3, nombre: 'Wango', descripcion: 'Ulti estelar', observaciones: 'mejorando', tipo: 'persona', musculosTrabajados: 'pierna'},
  ];
 
  constructor() { }

  getEjercicios(): Observable<Ejercicio[]> {
    let u= this.ejercicio.sort((a, b) => {
        return a.id - b.id;
      });
      return of(u)
  }

    getEjercicio(id: number): Observable<Ejercicio> {
        let u=this.ejercicio.find(ejercicio => ejercicio.id === id);
        if(!u){
            return new Observable<Ejercicio>(observer=>{
                observer.error("El ejercicio no existe")
            })
        }
        return of(u);
    }

  postEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    let u= this.ejercicio.find(u => u.id== ejercicio.id);
    if(u){
        return new Observable<Ejercicio>(observer =>{
            observer.error('El ejercicio ya existe');
          })
    }
    ejercicio.id = Math.max(...this.ejercicio.map(c => c.id)) + 1;
    this.ejercicio.push(ejercicio);
    return of(ejercicio)
  }

  putEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    let u = this.ejercicio.find(u => u.id === ejercicio.id);
    if(!u){
        return new Observable<Ejercicio>(observer =>{
            observer.error('El ejercicio no existe');
          })
    }
    let indice = this.ejercicio.findIndex(c => c.id == ejercicio.id);
    this.ejercicio[indice] = ejercicio;
    return of(ejercicio);
  }

  deleteEjercicio(id: number): Observable<void> {
    let indice = this.ejercicio.findIndex(c => c.id == id);
    if (indice < 0) {
        return new Observable<void>(observer => {
          observer.error('El usuario no existe');
        });
      }
    this.ejercicio.splice(indice, 1);
    return of();
  }
  
}
