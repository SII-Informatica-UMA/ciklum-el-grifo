import { Injectable } from '@angular/core';
import { Ejercicio } from '../entities/ejercicio';
import { Observable, of } from "rxjs";
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosFakeService {


  constructor() { }

  private ejercicio: Ejercicio [] = [
    {id: 1,
       nombre: 'Ejercicio1',
     descripcion: 'Desc Ej 1',
      observaciones: 'Obs Ej 1',
       tipo: 'Tipo Ej 1',
        musculosTrabajados: 'Musculo Ej1',
        dificultad: 'difícil',
        material: `Balon De Futbol`,
        multimedia:[
          'https://www.youtube.com/watch?v=6yUeQeOZkAE',
        ]
      },
    {id: 2,
       nombre: 'Ejercicio2',
        descripcion: 'Desc Ej 2',
         observaciones: 'Obs Ej 2'
         , tipo: 'Tipo Ej 2',
          musculosTrabajados: 'Musculo Ej2',
          dificultad: 'facíl'},
    {id: 3, nombre: 'Ejercicio3', descripcion: 'Desc Ej 3', observaciones: 'Obs Ej 3', tipo: 'Tipo Ej 3', musculosTrabajados: 'Musculo Ej3',dificultad: 'medio'},
  ];
 
  

  getEjercicios(entrenadorId: number): Observable<Ejercicio[]> {
    let a
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

  postEjercicio(ejercicio: Ejercicio,entrenadorId: number): Observable<Ejercicio> {
    let u= this.ejercicio.find(u => u.id== ejercicio.id);
    if(u){
        return new Observable<Ejercicio>(observer =>{
            observer.error('El ejercicio ya existe');
          })
    }
    ejercicio.id = entrenadorId;
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
