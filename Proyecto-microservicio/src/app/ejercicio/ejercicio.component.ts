import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../ejercicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../ejercicio';
import { FormularioEjercicioComponent } from '../formulario-ejercicio/formulario-ejercicio.component';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
})
export class EjercicioComponent implements OnInit{
  ejercicios: Ejercicio [] = [];
  ejercicioElegido?: Ejercicio;
  ejercicio?: Ejercicio;
  constructor(private ejercicioService: EjerciciosService, private modalService: NgbModal) { }

  editarEjercicios(ejercicio: Ejercicio): void {
    let ref = this.modalService.open(FormularioEjercicioComponent);
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.ejercicio = {...ejercicio};
    ref.result.then((ejercicio: Ejercicio) => {
      this.ejercicioService.editarEjercicios(ejercicio); // Emitir el evento de edición con el contacto actualizado
      this.ejercicioService.getEjercicios();
    }, (reason) => {});
  }
  
  ngOnInit(): void {
    this.ejercicios = this.ejercicioService.getEjercicios();
  }

  elegirEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioElegido = ejercicio;
  }

  aniadirEjercicio(): void {
    let ref = this.modalService.open(FormularioEjercicioComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.contacto = {id: 0, nombre: '', descripcion: '', observaciones: ''};
    ref.result.then((ejercicio: Ejercicio) => {
      this.ejercicioService.addEjercicios(ejercicio);
      this.ejercicios = this.ejercicioService.getEjercicios();
    }, (reason) => {});

  }
  rutinaEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioService.editarEjercicios(ejercicio);
    this.ejercicios = this.ejercicioService.getEjercicios();
    this.ejercicioElegido = this.ejercicios.find(c => c.id == ejercicio.id);
  }

  eliminarEjercicio(id: number): void {
    this.ejercicioService.eliminarEjercicios(id);
    this.ejercicios = this.ejercicioService.getEjercicios();
    this.ejercicioElegido = undefined;
  }
  
}
