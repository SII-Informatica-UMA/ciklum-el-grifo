import { Component } from '@angular/core';
import { Ejercicio} from '../entities/ejercicio';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioDetalles, Rutina } from '../entities/rutina';
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
  ejercicio!: Ejercicio;
  ejercicioDetalles: EjercicioDetalles = {series: 0, repeticiones: 0, duracionMinutos: 0, ejercicio : this.ejercicio}


  constructor(public modal: NgbActiveModal, private ejercicioRutinaService : EjercicioRutinaService, private rutinasService: RutinasService) { }

  guardarEjercicio(): void {
    this.modal.close(this.ejercicioDetalles);
  }


}
