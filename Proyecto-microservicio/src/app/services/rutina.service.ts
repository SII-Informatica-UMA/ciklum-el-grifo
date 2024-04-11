import { Injectable } from '@angular/core';
import { Rutina } from '../entities/rutina';
import { RutinasFakeService } from './rutinas.fake.service';
import { Observable, of } from "rxjs";
import { RutinasDBService } from './rutinas.db.services';
@Injectable({
  providedIn: 'root'
})

export class RutinasService {
  
  //CAMBIAR A RutinasDBService PARA USAR BACKEND O RutinasFakeService PARA USAR LOCAL
  constructor(private rutina:RutinasDBService) { }

  getRutinas(): Observable<Rutina[]> {
    return this.rutina.getRutinas();
  }
  

  addRutinas(rutina: Rutina): Observable<Rutina>{
    return this.rutina.postRutina(rutina);
  }

  editarRutinas(rutina: Rutina): Observable<Rutina> {
    return this.rutina.putRutina(rutina);
  }

  eliminarRutinas(id: number): Observable<void> {
    
    return this.rutina.deleteRutina(id);
  }

  getRutinaPorId(id: number): Observable<Rutina>  {
    return this.rutina.getRutina(id);
  }


}
