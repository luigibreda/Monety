import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../types/usuario.type';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {
    console.log('URL Api: ' + environment.apiUrl);
  }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsuarios(page: number, limit: number, searchQuery: string): Observable<any> {
    const params = { page: page.toString(), limit: limit.toString(), search_query: searchQuery };
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.getHeaders(), params });
  }

  deletaUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), withCredentials: true });
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), withCredentials: true });
  }

  atualizaUsuario(id: string, dadosUsuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dadosUsuario, { headers: this.getHeaders(), withCredentials: true });
  }
}
