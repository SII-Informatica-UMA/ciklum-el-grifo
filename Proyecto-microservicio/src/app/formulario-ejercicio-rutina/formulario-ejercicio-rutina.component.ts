import { Component } from '@angular/core';
import { EjercicioDetalles } from '../entities/rutina';
import {Ejercicio} from '../entities/ejercicio'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
import { RutinasService } from '../services/rutina.service';

@Component({
  selector: 'app-formulario-ejercicio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-ejercicio-rutina.component.html',
  styleUrls: ['./formulario-ejercicio-rutina.component.css']
})
export class FormularioEjercicioRutinaComponent {
  accion?: "Añadir" | "Editar";
  ejercicio: Ejercicio = { id: 0, nombre: '', descripcion: '', observaciones: '', tipo: '', musculosTrabajados: '',dificultad:'' };
  ejercicioDetalles: EjercicioDetalles = { series: 0, repeticiones: 0, duracionMinutos: 0, ejercicio: this.ejercicio};
  ejercicioDetallesAntiguo: EjercicioDetalles = { series: 0, repeticiones: 0, duracionMinutos: 0, ejercicio: this.ejercicio};

  constructor(public modal: NgbActiveModal, private ejercicioRutinaService: EjercicioRutinaService, private rutinasService: RutinasService) { }

  guardarEjercicio(): void {
      this.ejercicioDetalles.ejercicio = this.ejercicio;
      this.modal.close(this.ejercicioDetalles);
  }

  cerrarVentana(ejercicioDetallesAntiguo: EjercicioDetalles): void{
    if(this.accion == "Editar"){
      this.modal.close(ejercicioDetallesAntiguo);
    }else if(this.accion == "Añadir"){
      this.modal.dismiss();
    }
  }

}
