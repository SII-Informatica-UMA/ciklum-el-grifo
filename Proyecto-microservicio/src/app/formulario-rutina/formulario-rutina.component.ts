import { Component } from '@angular/core';
import  {Rutina} from '../rutina';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario-rutina',
  templateUrl: './formulario-rutina.component.html',
  styleUrls: ['./formulario-rutina.component.css']
})
export class FormularioRutinaComponent {
  accion?: "Añadir" | "Editar";
  rutina: Rutina = {id: 0, nombre: '', descripcion: '', observaciones: ''};

  constructor(public modal: NgbActiveModal) { }

  guardarContacto(): void {
    this.modal.close(this.rutina);
  }

}
