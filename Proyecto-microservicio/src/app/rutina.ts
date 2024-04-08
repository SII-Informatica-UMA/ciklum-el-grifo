
import { Ejercicio } from "./ejercicio";

export interface Rutina {
  id: number;
  nombre: string;
  descripcion: string;
  observaciones: string;
  ejercicios: Ejercicio [] 
}

export interface ejerciciosDetallados{
  series:number;
  repeticiones:number;
  duracionMinutos:number;
  ejercicio: Ejercicio;
}