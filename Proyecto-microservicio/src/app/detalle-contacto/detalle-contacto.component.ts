import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Rutina } from '../rutina';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormularioContactoComponent} from '../formulario-contacto/formulario-contacto.component'
import { RutinasService } from '../rutina.service';

@Component({
  selector: 'app-detalle-contacto',
  templateUrl: './detalle-contacto.component.html',
  styleUrls: ['./detalle-contacto.component.css']
})
export class DetalleContactoComponent {
  @Input() rutina?: Rutina;
  @Output() rutinaEditada = new EventEmitter<Rutina>();
  @Output() rutinaEliminada = new EventEmitter<number>();

  constructor(private rutinasService: RutinasService, private modalService: NgbModal) { }

editarContacto(): void {
  let ref = this.modalService.open(FormularioContactoComponent);
  ref.componentInstance.accion = "Editar";
  ref.componentInstance.rutina = {...this.rutina};
  ref.result.then((rutina: Rutina) => {
    this.rutinaEditada.emit(rutina); // Emitir el evento de edición con el contacto actualizado
  }, (reason) => {});
}

  

  eliminarContacto(): void {
    this.rutinaEliminada.emit(this.rutina?.id);
  }
}
