import { Component, OnInit } from '@angular/core';
import {RutinasService } from '../services/rutina.service';
import { UsuariosService } from '../services/usuarios.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormularioRutinaComponent} from '../formulario-rutina/formulario-rutina.component'
import {Rutina } from '../entities/rutina';
import { Rol } from '../entities/login';
import { CommonModule } from '@angular/common';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
import { DetalleRutinaComponent } from '../detalle-rutina/detalle-rutina.component';

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
  
  constructor(private rutinasService: RutinasService,private usuariosService: UsuariosService, private modalService: NgbModal, private ejercicioRutinaService: EjercicioRutinaService) { }

  private get rol() {
    return this.usuariosService.rolCentro;
  }

  isAdministrador(): boolean {
    console.log("Pregunta admin: "+this.rol);
    return this.rol?.rol == Rol.ADMINISTRADOR;
  }
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
    this.rutinasService.getRutinas().subscribe(rutinas=>{
      this.rutinas=rutinas;
    })
  }

  elegirRutina(rutina: Rutina): void {
    const ref = this.modalService.open(DetalleRutinaComponent);
    ref.componentInstance.rutina = rutina;
  }

  aniadirRutina(): void {
    let ref = this.modalService.open(FormularioRutinaComponent);
    ref.componentInstance.accion = "Añadir";
    ref.result.then((rutina: Rutina) => {
      this.rutinasService.getRutinas();
    }, (reason) => {});
  }
  rutinaEditado(rutina: Rutina): void {
    this.rutinasService.editarRutinas(rutina);
    this.rutinasService.getRutinas().subscribe(rutinas=>{
      this.rutinas=rutinas;
    })
    this.rutinaElegida = this.rutinas.find(c => c.id == rutina.id);
  }

  eliminarRutina(id: number): void {
    this.rutinasService.eliminarRutinas(id);
    this.rutinasService.getRutinas().subscribe(rutinas=>{
      this.rutinas=rutinas;
    })
    this.rutinaElegida = undefined;
    this.ejercicioRutinaService.eliminarRutina(id);
  }

  
}
