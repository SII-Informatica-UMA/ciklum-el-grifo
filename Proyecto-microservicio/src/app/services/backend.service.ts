import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Usuario } from "../entities/usuario";
import { HttpClient } from "@angular/common/http";
import { BACKEND_URI } from "../config/config";
import { JwtResponse } from "../entities/login";
import { Rutina } from "../entities/rutina";
import { Ejercicio } from "../entities/ejercicio";

// Este servicio usa el backend real

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(BACKEND_URI + '/usuario');
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(BACKEND_URI + '/usuario', usuario);
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(BACKEND_URI + '/usuario/' + usuario.id, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/usuario/' + id);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(BACKEND_URI + '/usuario/' + id);
  }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post<JwtResponse>(BACKEND_URI + '/login', {email: email, password: password})
      .pipe(map(jwtResponse => jwtResponse.jwt));
  }

  forgottenPassword(email: string): Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/forgottenpassword', {email: email});
  }

  resetPassword(token: string, password: string): Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/passwordreset', {token: token, password: password});
  }

  //-------------------------------------------RUTINAS----------------------------------------------------------

  getRutina(id: number): Observable<Rutina> {
    return this.httpClient.get<Rutina>(BACKEND_URI + '/rutina'+id);
  }

  putRutina(rutina: Rutina): Observable<Rutina> {
    return this.httpClient.put<Rutina>(BACKEND_URI + '/rutina/' + rutina.id, rutina);
  }

  deleteRutina(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/rutina/' + id);
  }
  
  getRutinas(): Observable<Rutina[]> {
    return this.httpClient.get<Rutina[]>(BACKEND_URI + '/rutina');
  }

  postRutina(rutina: Rutina): Observable<Rutina> {
    return this.httpClient.post<Rutina>(BACKEND_URI + '/rutina', rutina);
  }


  //-------------------------------------------EJERCICIOS----------------------------------------------------------

  getEjercicio(id: number): Observable<Ejercicio> {
    return this.httpClient.get<Ejercicio>(BACKEND_URI + '/ejercicio'+id);
  }

  putEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.httpClient.put<Ejercicio>(BACKEND_URI + '/ejercicio/' + ejercicio.id, ejercicio);
  }

  deleteEjercicio(id: number): Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/ejercicio/' + id);
  }

  getEjercicios(): Observable<Ejercicio[]> {
    return this.httpClient.get<Ejercicio[]>(BACKEND_URI + '/ejercicio');
  }

  postEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.httpClient.post<Ejercicio>(BACKEND_URI + '/ejercicio', ejercicio);
  }
}
