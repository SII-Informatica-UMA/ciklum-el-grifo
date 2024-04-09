import { Component } from '@angular/core';
import { Ejercicio, ejerciciosDetallados } from '../entities/ejercicio';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-formulario-ejercicio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-ejercicio-rutina.component.html',
  styleUrls: ['./formulario-ejercicio-rutina.component.css']
})
export class FormularioEjercicioRutinaComponent {
  accion?: "Añadir" | "Editar";
  ejercicio: Ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', observaciones: '',material:'', musculosTrabajados:'',tipo:'',multimedia: ''};
  ejercicioDetalle: ejerciciosDetallados = {series: 0, repeticiones: 0, duracionMinutos: 0,ejercicio: this.ejercicio};

  constructor(public modal: NgbActiveModal) { }

  guardarEjercicio(): void {
    this.modal.close(this.ejercicio);
  }
}
