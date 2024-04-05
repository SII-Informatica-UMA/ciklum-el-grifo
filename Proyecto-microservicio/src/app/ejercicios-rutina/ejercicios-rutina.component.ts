import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from '../ejercicio';
import { EjerciciosService } from '../ejercicio.service';

@Component({
  selector: 'app-ejercicios-rutina',
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

  guardarEjercicio(): void {
    this.modal.close(this.ejercicio);
  }
  aniadirEjercicio():void{
    
  }
  
}
