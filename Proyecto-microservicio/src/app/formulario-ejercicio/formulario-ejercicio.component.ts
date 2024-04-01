import { Component } from '@angular/core';
import { Ejercicio } from '../ejercicio';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-formulario-ejercicio',
  standalone: true,
  imports: [],
  templateUrl: './formulario-ejercicio.component.html',
  styleUrl: './formulario-ejercicio.component.css'
})
export class FormularioEjercicioComponent {
  accion?: "Añadir" | "Editar";
  ejercicio: Ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', marterial:'', musculosTrabajados:'',tipo:'',multimedia:['']};

  constructor(public modal: NgbActiveModal) { }

  guardarContacto(): void {
    this.modal.close(this.ejercicio);
  }
}
