import { Component } from '@angular/core';
import  {Rutina} from '../rutina';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css']
})
export class FormularioContactoComponent {
  accion?: "Añadir" | "Editar";
  rutina: Rutina = {id: 0, nombre: '', apellidos: '', email: '', telefono: ''};

  constructor(public modal: NgbActiveModal) { }

  guardarContacto(): void {
    this.modal.close(this.rutina);
  }

}
