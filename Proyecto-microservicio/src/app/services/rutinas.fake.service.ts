import { Injectable } from '@angular/core';
import { Rutina } from '../entities/rutina';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RutinasFakeService {
  private rutina: Rutina [] = [
    {id: 1, nombre: 'Rutina1', descripcion: 'Desc Rut 1', observaciones: 'Obs Rut 1', ejercicios: []},
    {id: 2, nombre: 'Rutina2', descripcion: 'Desc Rut 2', observaciones: 'Obs Rut 2', ejercicios: []},
    {id: 3, nombre: 'Rutina3', descripcion: 'Desc Rut 3', observaciones: 'Obs Rut 3', ejercicios: []},
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
