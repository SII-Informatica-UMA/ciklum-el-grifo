import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio} from '../entities/ejercicio';
import { Rutina, EjercicioDetalles } from '../entities/rutina';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
import { EjerciciosRutinaComponent } from '../ejercicios-rutina/ejercicios-rutina.component';
import { RutinasService } from '../services/rutina.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioEjercicioRutinaComponent } from '../formulario-ejercicio-rutina/formulario-ejercicio-rutina.component';

@Component({
  selector: 'app-formulario-rutina',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-rutina.component.html',
  styleUrls: ['./formulario-rutina.component.css']
})
export class FormularioRutinaComponent implements OnInit {
  accion?: "Añadir" | "Editar";
  rutina: Rutina = { id: 0, nombre: '', descripcion: '', observaciones: '', ejercicios: [] };
  ejerciciosRutina: EjercicioDetalles[] = [];
  ejercicio?: Ejercicio;
  ejercicioDetalles?: EjercicioDetalles;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejercicioRutinaService: EjercicioRutinaService, private rutinasService: RutinasService) { }

  ngOnInit(): void {
    if (this.accion === "Añadir") {
      this.rutinasService.addRutinas(this.rutina);
    }       
    this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);
  }
  
  guardarRutina(): void {
    this.modal.close(this.rutina);
  }

  aniadirEjercicio(): void {
    let ref = this.modalService.open(EjerciciosRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.result.then((ejercicioDetalles: EjercicioDetalles) => {
        this.ejercicioRutinaService.addEjerciciosRutina(this.rutina.id, ejercicioDetalles);
        this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);
        this.ejerciciosRutina.sort((a, b) => a.ejercicio.nombre.localeCompare(b.ejercicio.nombre));
    }, (reason) => {});
  }


  editarEjercicio(rutina: Rutina){
    let ref = this.modalService.open(FormularioEjercicioRutinaComponent);
    ref.componentInstance.accion = "Editar";
    ref.result.then((ejercicioDetalles) => {
        this.ejercicioRutinaService.addEjerciciosRutina(this.rutina.id, ejercicioDetalles);
        this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);
        this.ejerciciosRutina.sort((a, b) => a.ejercicio.nombre.localeCompare(b.ejercicio.nombre));
    }, (reason) => { });
  }

  eliminarEjercicio(id: number){
    this.ejercicioRutinaService.eliminarEjercicios(this.rutina.id, id);
  }

  cerrarVentana(id: number){
    if(this.accion === "Añadir"){
      this.ejercicioRutinaService.eliminarRutina(id);
      this.rutinasService.eliminarRutinas(id);
      this.rutinasService.getRutinas();
    }
    this.modal.close(this.rutina);
  }

}
