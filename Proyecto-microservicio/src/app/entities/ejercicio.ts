
export interface Ejercicio{
    id:number; 
    nombre:string; 
    descripcion: string; 
    observaciones: string;
    tipo: string; 
    musculosTrabajados: string; 
    material?: string;
    dificultad?: string;
    multimedia?: string;
}

export interface ejerciciosDetallados{
    series:number;
    repeticiones:number;
    duracionMinutos:number;
    ejercicio: Ejercicio;
}