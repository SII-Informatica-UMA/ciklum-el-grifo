// formulario-rutina.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../ejercicio';
import { Rutina } from '../rutina';
import { EjercicioRutinaService } from '../ejercicio-rutina.service';
import { EjerciciosRutinaComponent } from '../ejercicios-rutina/ejercicios-rutina.component';

@Component({
  selector: 'app-formulario-rutina',
  templateUrl: './formulario-rutina.component.html',
  styleUrls: ['./formulario-rutina.component.css']
})
export class FormularioRutinaComponent implements OnInit {
  accion?: "Añadir" | "Editar";
  rutina: Rutina = { id: 0, nombre: '', descripcion: '', observaciones: '', ejercicios: [] };
  ejerciciosRutina: Ejercicio[] = [];
  ejercicio?: Ejercicio;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejercicioRutinaService: EjercicioRutinaService) { }

  ngOnInit(): void {
    if (this.rutina.id) {
      this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);
    }
  }

  guardarRutina(): void {
    this.modal.close(this.rutina);
  }

  aniadirEjercicio(): void {
    let ref = this.modalService.open(EjerciciosRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.result.then((ejercicio) => {
      if (ejercicio) {
        this.ejercicioRutinaService.addEjerciciosRutina(this.rutina.id, ejercicio);
        this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);
        this.ejerciciosRutina.sort((a, b) => a.nombre.localeCompare(b.nombre));
      }
    }, (reason) => { });
  }

  editarRutina(rutina: Rutina){

  }

  eliminarRutina(id: number){

  }

}