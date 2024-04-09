// formulario-rutina.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio, ejerciciosDetallados } from '../entities/ejercicio';
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
  templateUrl: './detalle-rutina.component.html',
  styleUrls: ['./detalle-rutina.component.css']
})
export class DetalleRutinaComponent implements OnInit {
  accion?: "Añadir" | "Editar";
  rutina: Rutina = { id: 0, nombre: '', descripcion: '', observaciones: '', ejercicios: [] };
  ejerciciosRutina: Ejercicio[] = [];
  ejercicio?: Ejercicio;
  ejercicioDetallado?: ejerciciosDetallados;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejercicioRutinaService: EjercicioRutinaService, private rutinasService: RutinasService) { }

  ngOnInit(): void {
    this.ejerciciosRutina = this.ejercicioRutinaService.getEjerciciosRutina(this.rutina.id);
  }

  cerrarVentana(){
    this.modal.close(this.rutina);
  }

}
