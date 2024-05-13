import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  private apiUrl = `${environment.apiUrl}/arquivos`;

  constructor(private http: HttpClient) { }

  getAllArquivos(page: number = 0, limit: number = 10, search: string = ""): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}&search_query=${search}`);
  }

  deleteArquivo(arquivoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${arquivoId}`);
  }
  
  // Adicione outros métodos conforme necessário para editar, visualizar e carregar arquivos
}
