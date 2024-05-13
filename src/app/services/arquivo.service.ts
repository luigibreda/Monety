import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arquivos } from '../types/arquivo.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  private apiUrl = `${environment.apiUrl}/arquivos`;

  constructor(private http: HttpClient) { }

  getAllArquivos(): Observable<Arquivos[]> {
    return this.http.get<Arquivos[]>(`${this.apiUrl}`);
  }

  deleteArquivo(userId: string, arquivoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/arquivos/${arquivoId}`);
  }

  // Adicione outros métodos conforme necessário para editar, visualizar e carregar arquivos
}
