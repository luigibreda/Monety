import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  deletaUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), withCredentials: true });
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), withCredentials: true });
  }

}