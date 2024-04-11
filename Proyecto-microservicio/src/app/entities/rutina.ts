
import { Ejercicio } from "./ejercicio";

export interface Rutina {
  id: number;
  nombre: string;
  descripcion: string;
  observaciones: string;
  ejercicios: EjercicioDetalles [] 
}

export interface EjercicioDetalles {
  series: number;
  repeticiones:number;
  duracionMinutos: number;
  ejercicio: Ejercicio;
}

