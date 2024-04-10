import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../entities/ejercicio';
import { EjerciciosService } from '../services/ejercicio.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
import { FormularioEjercicioRutinaComponent } from '../formulario-ejercicio-rutina/formulario-ejercicio-rutina.component';
import { EjercicioDetalles } from '../entities/rutina';
import { Rutina } from '../entities/rutina';
import { RutinasService } from '../services/rutina.service';

@Component({
  selector: 'app-ejercicios-rutina',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ejercicios-rutina.component.html',
  styleUrls: ['./ejercicios-rutina.component.css']
})
export class EjerciciosRutinaComponent implements OnInit {
  accion?: "Añadir" | "Editar";
  ejercicios: Ejercicio [] = [];
  rutina?: Rutina;
  ejercicioDetalles?: EjercicioDetalles;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejerciciosService: EjerciciosService, private ejercicioRutinaService: EjercicioRutinaService, private rutinasService: RutinasService) { }

  ngOnInit(): void {
    this.ejercicios = this.ejerciciosService.getEjercicios();
  }
  
  aniadirEjercicio(id: number): void {
    let ref = this.modalService.open(FormularioEjercicioRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.ejercicio = this.ejerciciosService.getEjercicioPorId(id);
    ref.componentInstance.ejercicioDetalles = this.ejercicioDetalles;
    ref.result.then((ejercicioDetalles: EjercicioDetalles) => {
        this.modal.close(ejercicioDetalles); // Envía el ejercicio de vuelta al componente principal
    }, (reason) => {});
  }
  
}
