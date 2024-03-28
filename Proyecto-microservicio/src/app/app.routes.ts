import { Routes } from '@angular/router';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { RutinasComponent } from './rutinas/rutinas.component';

export const routes: Routes = [
    {path: 'rutinas', component: RutinasComponent},
    {path: 'ejercicios', component: EjerciciosComponent},
];
