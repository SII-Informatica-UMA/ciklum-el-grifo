import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../entities/ejercicio';
import { EjerciciosService } from '../services/ejercicio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ejercicios-rutina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ejercicios-rutina.component.html',
  styleUrls: ['./ejercicios-rutina.component.css']
})
export class EjerciciosRutinaComponent implements OnInit {
  accion?: "Añadir" | "Editar";
  ejercicio: Ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', material:'', musculosTrabajados:'',tipo:'',multimedia: ''};
  ejercicios: Ejercicio [] = [];

  constructor(public modal: NgbActiveModal, private ejerciciosService: EjerciciosService) { }

  ngOnInit(): void {
    this.ejercicios = this.ejerciciosService.getEjercicios();
  }

  aniadirEjercicio():void{
    this.modal.close(this.ejercicio);
  }
  
}
