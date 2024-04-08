import { Component, OnInit } from '@angular/core';
import {RutinasService } from '../services/rutina.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormularioRutinaComponent} from '../formulario-rutina/formulario-rutina.component'
import {Rutina } from '../entities/rutina';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {
  rutinas: Rutina [] = [];
  rutinaElegida?: Rutina;
  rutina?: Rutina;
  constructor(private rutinasService: RutinasService, private modalService: NgbModal) { }

  editarRutina(rutina: Rutina): void {
    let ref = this.modalService.open(FormularioRutinaComponent);
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.rutina = {...rutina};
    ref.result.then((rutina: Rutina) => {
      this.rutinasService.editarRutinas(rutina); // Emitir el evento de edición con el contacto actualizado
      this.rutinasService.getRutinas();
    }, (reason) => {});
  }
  
  ngOnInit(): void {
    this.rutinas = this.rutinasService.getRutinas();
  }

  elegirRutina(rutina: Rutina): void {
    this.rutinaElegida = rutina;
  }

  aniadirRutina(): void {
    let ref = this.modalService.open(FormularioRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.result.then((rutina: Rutina) => {
      this.rutinasService.addRutinas(rutina);
      this.rutinasService.getRutinas();
    }, (reason) => {});
  }
  rutinaEditado(rutina: Rutina): void {
    this.rutinasService.editarRutinas(rutina);
    this.rutinas = this.rutinasService.getRutinas();
    this.rutinaElegida = this.rutinas.find(c => c.id == rutina.id);
  }

  eliminarRutina(id: number): void {
    this.rutinasService.eliminarRutinas(id);
    this.rutinas = this.rutinasService.getRutinas();
    this.rutinaElegida = undefined;
  }

  
}
