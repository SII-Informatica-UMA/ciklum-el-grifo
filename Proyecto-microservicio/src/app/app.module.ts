import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioRutinaComponent } from './formulario-rutina/formulario-rutina.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { FormularioEjercicioComponent } from './formulario-ejercicio/formulario-ejercicio.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioRutinaComponent,
    RutinasComponent,
    EjercicioComponent,
    FormularioEjercicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
