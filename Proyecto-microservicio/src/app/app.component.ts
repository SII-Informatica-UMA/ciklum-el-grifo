import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RutinasComponent } from './rutinas/rutinas.component';
import { Rutina } from './rutina';
import { EjercicioComponent } from './ejercicio/ejercicio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  componenteActual: any;

  mostrarRutinas(){
    this.componenteActual=RutinasComponent;
  }

  mostrarEjercicios(){
    this.componenteActual=EjercicioComponent;
  }

  
}
