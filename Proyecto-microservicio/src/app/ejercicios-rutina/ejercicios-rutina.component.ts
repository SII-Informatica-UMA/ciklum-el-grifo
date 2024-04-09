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
  ejercicio: Ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', material:'', musculosTrabajados:'',tipo:'',multimedia: ''};
  ejercicios: Ejercicio [] = [];

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private ejerciciosService: EjerciciosService, private ejercicioRutinaService: EjercicioRutinaService) { }

  ngOnInit(): void {
    this.ejercicios = this.ejerciciosService.getEjercicios();
  }

  aniadirEjercicio():void{
    let ref = this.modalService.open(FormularioEjercicioRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.result.then(() => {
      this.modal.close(this.ejercicio);
    }, (reason) => { });
  }
  
}
