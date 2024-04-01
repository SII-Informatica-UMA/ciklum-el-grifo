
export interface Ejercicio{
    id:number; 
    nombre:string; 
    descripcion: string; 
    tipo: string; 
    musculosTrabajados: string; 
    marterial?: string;
    dificultad?: string;
    multimedia?: [string];
}

export interface ejerciciosDetallados{
    series:number;
    repeticiones:number;
    duracionMinutos:number;
    ejercicio: Ejercicio;
}