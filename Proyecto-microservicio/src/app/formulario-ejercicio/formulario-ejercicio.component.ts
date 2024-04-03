import { Component } from '@angular/core';
import { Ejercicio } from '../ejercicio';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-formulario-ejercicio',
  templateUrl: './formulario-ejercicio.component.html',
  styleUrls: ['./formulario-ejercicio.component.css']
})
export class FormularioEjercicioComponent {
  accion?: "Añadir" | "Editar";
  ejercicio: Ejercicio = {id: 0, nombre: '', descripcion: '',dificultad: '', material:'', musculosTrabajados:'',tipo:'',multimedia: ''};

  constructor(public modal: NgbActiveModal) { }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0]; // Obtener el archivo seleccionado del evento
    // Convertir el archivo a URL utilizando el objeto URL
    this.ejercicio.multimedia = URL.createObjectURL(selectedFile); 
  }

  getVideoURL(): string | null {
    if (this.ejercicio.multimedia) {
      return this.ejercicio.multimedia; // Devolver la URL del video directamente
    }
    return null; // Si no hay video seleccionado, devolver null
  }

  guardarContacto(): void {
    this.modal.close(this.ejercicio);
  }
}
