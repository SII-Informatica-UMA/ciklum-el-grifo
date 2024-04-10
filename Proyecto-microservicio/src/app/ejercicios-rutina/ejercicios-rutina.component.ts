import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../entities/ejercicio';
import { EjerciciosService } from '../services/ejercicio.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
import { FormularioEjercicioRutinaComponent } from '../formulario-ejercicio-rutina/formulario-ejercicio-rutina.component';

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
  ejercicio?: Ejercicio;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejerciciosService: EjerciciosService, private ejercicioRutinaService: EjercicioRutinaService) { }

  ngOnInit(): void {
    this.ejercicios = this.ejerciciosService.getEjercicios();
  }
  
  aniadirEjercicio(id: number): void {
    let ref = this.modalService.open(FormularioEjercicioRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.ejercicio = this.ejerciciosService.getEjercicioPorId(id);
    ref.result.then((ejercicio: Ejercicio) => {
        this.modal.close(ejercicio); // Envía el ejercicio de vuelta al componente principal
    }, (reason) => {});
  }

}
