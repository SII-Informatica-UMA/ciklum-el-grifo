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
    ref.componentInstance.rutina = {...ejercicio};
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

  reproducirVideo(src: string | undefined): void {
    if (src) {
      const videoContainer = document.createElement('div');
      videoContainer.style.position = 'fixed'; // Establece la posición fija para que esté por encima de todo
      videoContainer.style.top = '0';
      videoContainer.style.left = '0';
      videoContainer.style.width = '100%';
      videoContainer.style.height = '100%';
      videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo semitransparente para superponerse al contenido
      videoContainer.style.zIndex = '9999';
  
      const videoPlayer = document.createElement('video');
      videoPlayer.src = src;
      videoPlayer.controls = true;
      videoPlayer.autoplay = true;
      videoPlayer.style.position = 'absolute'; // Establece la posición absoluta dentro del contenedor
      videoPlayer.style.top = '50%'; // Coloca el reproductor de video en el centro verticalmente
      videoPlayer.style.left = '50%'; // Coloca el reproductor de video en el centro horizontalmente
      videoPlayer.style.transform = 'translate(-50%, -50%)'; // Centra el reproductor de video
      videoPlayer.style.width = '80%'; // Ajusta el ancho del video al 80% del contenedor
      videoPlayer.style.height = 'auto'; // Ajusta la altura del video automáticamente
  
      const closeButton = document.createElement('button');
      closeButton.innerText = 'X';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.style.zIndex = '10000'; // Asegura que el botón esté por encima del video
      closeButton.addEventListener('click', (event) => {
        videoContainer.remove(); // Elimina el contenedor del video al hacer clic en el botón de cierre
        if (event.target === videoContainer) {
          videoContainer.remove(); // Cerrar el video al hacer clic en el fondo semitransparente
        }
      });
  
      videoContainer.appendChild(videoPlayer);
      videoContainer.appendChild(closeButton);
      document.body.appendChild(videoContainer);
    }
  }
  
}

