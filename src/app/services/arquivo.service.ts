import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Arquivo } from '../types/arquivo.type';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  private apiUrl = `${environment.apiUrl}/arquivos`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllArquivos(page: number = 0, limit: number = 10, search: string = ""): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search_query', search);
    return this.http.get<any>(this.apiUrl, { params, headers: this.getHeaders() });
  }

  getArquivo(id: string, page: number = 0, limit: number = 10, search: string = ""): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search_query', search);
    return this.http.get<any>(`${this.apiUrl}/${id}`, { params, headers: this.getHeaders() });
  }

  deleteArquivo( arquivoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${arquivoId}`, { headers: this.getHeaders(), withCredentials: true });
  }

  // pausarDespausarArquivo( arquivoId: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/${arquivoId}/pausarDespausarArquivo`, { headers: this.getHeaders(), withCredentials: true });
  // }

  aprovarArquivo( arquivoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${arquivoId}/aprovarArquivo`, { headers: this.getHeaders(), withCredentials: true });
  }

  reprovarArquivo( arquivoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${arquivoId}/reprovarArquivo`, { headers: this.getHeaders(), withCredentials: true });
  }

  // Adicione outros métodos conforme necessário para editar, visualizar e carregar arquivos
}
