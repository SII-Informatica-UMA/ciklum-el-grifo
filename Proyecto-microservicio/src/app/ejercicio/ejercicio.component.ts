import { Component, OnInit, ElementRef } from '@angular/core';
import { EjerciciosService } from '../ejercicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioRutinaComponent } from '../formulario-rutina/formulario-rutina.component';
import { Ejercicio } from '../ejercicio';
import { FormularioEjercicioComponent } from '../formulario-ejercicio/formulario-ejercicio.component';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
})
export class EjercicioComponent{
  ejercicios: Ejercicio [] = [];
  ejercicioElegido?: Ejercicio;
  ejercicio?: Ejercicio;
  constructor(private ejerciciosService: EjerciciosService, private modalService: NgbModal, private elRef: ElementRef) { }

  editarEjercicio(ejercicio: Ejercicio): void {
    let ref = this.modalService.open(FormularioEjercicioComponent);
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.ejercicio = {...ejercicio};
    ref.result.then((ejercicio: Ejercicio) => {
      this.ejerciciosService.editarEjercicios(ejercicio); // Emitir el evento de edición con el contacto actualizado
      this.ejerciciosService.getEjercicios();
    }, (reason) => {});
  }
  
  ngOnInit(): void {
    this.ejercicios = this.ejerciciosService.getEjercicios();
  }

  elegirEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioElegido = ejercicio;
  }

  aniadirEjercicio(): void {
    let ref = this.modalService.open(FormularioEjercicioComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', marterial:'', musculosTrabajados:'',tipo:''};
    ref.result.then((ejercicio: Ejercicio) => {
      this.ejerciciosService.addEjercicios(ejercicio);
      this.ejercicios = this.ejerciciosService.getEjercicios();
      this.ejercicios.sort((a,b)=>a.nombre.localeCompare(b.nombre));
    }, (reason) => {});

  }
  ejercicioEditado(ejercicio: Ejercicio): void {
    this.ejerciciosService.editarEjercicios(ejercicio);
    this.ejercicios = this.ejerciciosService.getEjercicios();
    this.ejercicioElegido = this.ejercicios.find(c => c.id == ejercicio.id);
  }

  eliminarEjercicio(id: number): void {
    this.ejerciciosService.eliminarEjercicios(id);
    this.ejercicios = this.ejerciciosService.getEjercicios();
    this.ejercicioElegido = undefined;
  }

  reproducirVideo(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
    }
  }
  
/*
  reproducirVideo(url: string | undefined): void {
    if (url) {
      const videoContainer = document.createElement('div');
      videoContainer.style.position = 'fixed';
      videoContainer.style.top = '0';
      videoContainer.style.left = '0';
      videoContainer.style.width = '100%';
      videoContainer.style.height = '100%';
      videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      videoContainer.style.zIndex = '9999';

      const videoPlayer = document.createElement('iframe');
      videoPlayer.src = url;
      videoPlayer.style.width = '100%';
      videoPlayer.style.height = '100%';
      videoPlayer.style.border = 'none';

      const closeButton = document.createElement('button');
      closeButton.innerText = 'X';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.style.zIndex = '10000';
      closeButton.addEventListener('click', () => {
        videoContainer.remove();
      });

      videoContainer.appendChild(videoPlayer);
      videoContainer.appendChild(closeButton);
      document.body.appendChild(videoContainer);
    }
  }
  */
}

