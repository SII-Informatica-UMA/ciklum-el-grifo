import { Component } from '@angular/core';
import { Ejercicio } from '../entities/ejercicio';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-ejercicio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-ejercicio.component.html',
  styleUrls: ['./formulario-ejercicio.component.css']
})
export class FormularioEjercicioComponent {
  accion?: "Añadir" | "Editar";
  ejercicio: Ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', material:'', musculosTrabajados:'',tipo:'',multimedia: ''};

  constructor(public modal: NgbActiveModal) { }

  guardarEjercicio(): void {
    this.modal.close(this.ejercicio);
  }
}
