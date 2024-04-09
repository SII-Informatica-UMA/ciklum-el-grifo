// formulario-rutina.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../entities/ejercicio';
import { Rutina } from '../entities/rutina';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
import { EjerciciosRutinaComponent } from '../ejercicios-rutina/ejercicios-rutina.component';
import { RutinasService } from '../services/rutina.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ejerciciosRutina: Ejercicio[] = [];
  ejercicio?: Ejercicio;
  rutinas: Rutina [] = [];

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejercicioRutinaService: EjercicioRutinaService, private rutinasService: RutinasService) { }

  ngOnInit(): void {
    if (this.accion === "Añadir") {
      this.rutinasService.addRutinas(this.rutina);
    }       
    this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);

  }
  
  guardarRutina(): void {
    this.modal.close(this.ejercicio);
  }

  aniadirEjercicio(): void{
    let ref = this.modalService.open(EjerciciosRutinaComponent);
    ref.componentInstance.accion = "Editar";
    ref.result.then((ejercicio) => {
      if (ejercicio) {
        this.ejercicioRutinaService.addEjerciciosRutina(this.rutina.id, ejercicio);
        this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);
        this.ejerciciosRutina.sort((a, b) => a.nombre.localeCompare(b.nombre));
      }
    }, (reason) => { });
  }


  editarEjercicio(rutina: Rutina){

  }

  eliminarEjercicio(id: number){

  }

  cerrarVentana(id: number){
    if(this.accion === "Añadir"){
      this.rutinasService.eliminarRutinas(id);
      this.rutinas = this.rutinasService.getRutinas();
      this.ejercicioRutinaService.eliminarRutina(id);
    }
    this.modal.close(this.rutina);
  }

}
