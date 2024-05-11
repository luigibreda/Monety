import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../types/usuario.type';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = `${environment.apiUrl}/usuarios`; // Ajuste a URL base conforme necessário

  constructor(private http: HttpClient) {
    console.log('URL Api: ' + environment.apiUrl);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  deletaUsuario(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${userId}`);
  }
}