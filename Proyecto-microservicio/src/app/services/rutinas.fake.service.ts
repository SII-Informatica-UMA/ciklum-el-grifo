import { Injectable } from '@angular/core';
import { Rutina } from '../entities/rutina';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RutinasFakeService {
  private rutina: Rutina [] = [
    {id: 1, nombre: 'Parte pecho', descripcion: 'Pechito de fuego', observaciones: 'rutina no aconsejable', ejercicios: []},
    {id: 2, nombre: 'Culo insano', descripcion: 'Let him cook', observaciones: 'no apto para gays', ejercicios: []},
    {id: 3, nombre: 'Wango', descripcion: 'Ulti estelar', observaciones: 'venir comio de casa', ejercicios: []},
  ];

  constructor() { }

 
  getRutina(id: number): Observable<Rutina>  {
    let u =this.rutina.find(rutina => rutina.id === id);
    if (!u){
      return new Observable<Rutina>(observer =>{
        observer.error('La rutina no existe');
      })
    }
    return  of(u);
  }

  postRutina(rutina: Rutina): Observable<Rutina>  {
    let u = this.rutina.find(u => u.id === rutina.id);
    if(u){
      return new Observable<Rutina>(observer =>{
        observer.error('La rutina ya existe');
      })
    }
    rutina.id = Math.max(...this.rutina.map(c => c.id)) + 1;
    this.rutina.push(rutina);
    return of(rutina);
  }

  deleteRutina(id: number): Observable<void> {
    let indice = this.rutina.findIndex(c => c.id == id);
    if (indice < 0) {
      return new Observable<void>(observer => {
        observer.error('El usuario no existe');
      });
    }
    this.rutina.splice(indice, 1);
    return of();
  }

  getRutinas(): Observable<Rutina[]> {
    let u= this.rutina.sort((a, b) => {
      return a.id - b.id;
    });
    return of(u);
  }
  putRutina(rutina: Rutina):Observable<Rutina> {
    let u = this.rutina.find(u => u.id === rutina.id);
    if(!u){
      return new Observable<Rutina>(observer =>{
        observer.error('La rutina no existe');
      })
    }
    let indice = this.rutina.findIndex(c => c.id == rutina.id);
    this.rutina[indice] = rutina;
    return of(rutina);
  }

  

  


}
