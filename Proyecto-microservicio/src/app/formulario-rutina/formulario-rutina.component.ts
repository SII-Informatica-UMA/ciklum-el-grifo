import { Component, OnInit} from '@angular/core';
import { EjerciciosService } from '../ejercicio.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../ejercicio';
import { FormularioEjercicioComponent } from '../formulario-ejercicio/formulario-ejercicio.component';
import { EjerciciosRutinaComponent } from '../ejercicios-rutina/ejercicios-rutina.component';
import { Rutina } from '../rutina';



@Component({
  selector: 'app-formulario-rutina',
  templateUrl: './formulario-rutina.component.html',
  styleUrls: ['./formulario-rutina.component.css']
})
export class FormularioRutinaComponent {
  accion?: "Añadir" | "Editar";
  rutina: Rutina = {id: 0, nombre: '', descripcion: '', observaciones: '', ejercicios: []};
  EjerciciosService: any;
  ejercicios: Ejercicio [] = [];

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejerciciosService: EjerciciosService) { }

  guardarRutina(): void {
    this.modal.close(this.rutina);
  }

  aniadirEjercicio(): void {
    let ref = this.modalService.open(EjerciciosRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', marterial:'', musculosTrabajados:'',tipo:''};
    ref.result.then((ejercicio: Ejercicio) => {
      this.ejerciciosService.addEjercicios(ejercicio);
      this.ejercicios = this.ejerciciosService.getEjercicios();
      this.ejercicios.sort((a,b)=>a.nombre.localeCompare(b.nombre));
    }, (reason) => {});

  }

}
