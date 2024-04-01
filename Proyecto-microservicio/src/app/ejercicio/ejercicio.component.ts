import { Component, OnInit } from '@angular/core';
import { EjercicosService } from '../ejercicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioRutinaComponent } from '../formulario-rutina/formulario-rutina.component';
import { Ejercicio } from '../ejercicio';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
})
export class EjercicioComponent{
  ejercicios: Ejercicio [] = [];
  ejercicioElegido?: Ejercicio;
  ejercicio?: Ejercicio;
  constructor(private ejerciciosService: EjercicosService, private modalService: NgbModal) { }

  editarEjercicio(ejercicio: Ejercicio): void {
    let ref = this.modalService.open(FormularioRutinaComponent);
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.rutina = {...ejercicio};
    ref.result.then((ejercicio: Ejercicio) => {
      this.ejerciciosService.editarEjercicos(ejercicio); // Emitir el evento de edición con el contacto actualizado
      this.ejerciciosService.getEjercicos();
    }, (reason) => {});
  }
  
  ngOnInit(): void {
    this.ejercicios = this.ejerciciosService.getEjercicos();
  }

  elegirEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioElegido = ejercicio;
  }

  aniadirEjercicio(): void {
    let ref = this.modalService.open(FormularioRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.contacto = {id: 0, nombre: '', descripcion: '', observaciones: ''};
    ref.result.then((ejercicio: Ejercicio) => {
      this.ejerciciosService.addEjercicos(ejercicio);
      this.ejercicios = this.ejerciciosService.getEjercicos();
      this.ejercicios.sort((a,b)=>a.nombre.localeCompare(b.nombre));
    }, (reason) => {});

  }
  ejercicioEditado(ejercicio: Ejercicio): void {
    this.ejerciciosService.editarEjercicos(ejercicio);
    this.ejercicios = this.ejerciciosService.getEjercicos();
    this.ejercicioElegido = this.ejercicios.find(c => c.id == ejercicio.id);
  }

  eliminarEjercicio(id: number): void {
    this.ejerciciosService.eliminarEjercicos(id);
    this.ejercicios = this.ejerciciosService.getEjercicos();
    this.ejercicioElegido = undefined;
  }

}
