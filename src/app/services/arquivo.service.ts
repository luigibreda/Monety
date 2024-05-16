import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs'; // Importar throwError de 'rxjs'
import { catchError, shareReplay } from 'rxjs/operators'; // Importar catchError e shareReplay de 'rxjs/operators'
import { environment } from '../../environments/environment';
import { Arquivo } from '../types/arquivo.type';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  private apiUrl = `${environment.apiUrl}/arquivos`;

  private cacheArquivos: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllArquivos(page: number = 0, limit: number = 10, search: string = ""): Observable<any> {
    const cacheKey = `getAllArquivos:${page}:${limit}:${search}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const expirationTime = Number(cachedTimestamp) + (1 * 6 * 100); // Definindo o tempo de vida do cache 
      const currentTime = new Date().getTime();

      if (currentTime < expirationTime) {
        // Retornar dados em cache
        return of(JSON.parse(cachedData));
      }
    }

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search_query', search);

    return this.http.get<any>(this.apiUrl, { params, headers: this.getHeaders() }).pipe(
      catchError(error => throwError(error)),
      tap(data => {
        // Armazenar dados e timestamp no localStorage
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_timestamp`, new Date().getTime().toString());
      }),
      shareReplay(25)
    );
  }

  getArquivo(id: string, page: number = 0, limit: number = 10, search: string = ""): Observable<any> {
    const cacheKey = `getArquivo:${id}:${page}:${limit}:${search}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
  
    if (cachedData && cachedTimestamp) {
      const expirationTime = Number(cachedTimestamp) + (1 * 60 * 1000); // Definindo o tempo de vida do cache 
      const currentTime = new Date().getTime();
  
      if (currentTime < expirationTime) {
        // Retornar dados em cache
        return of(JSON.parse(cachedData));
      }
    }
  
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search_query', search);
  
    return this.http.get<any>(`${this.apiUrl}/${id}`, { params, headers: this.getHeaders() }).pipe(
      catchError(error => throwError(error)),
      tap(data => {
        // Armazenar dados e timestamp no localStorage
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_timestamp`, new Date().getTime().toString());
      }),
      shareReplay(25)
    );
  }


  uploadArquivo(form: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, form, { headers: this.getHeaders(), withCredentials: true });
  }

  deleteArquivo( arquivoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${arquivoId}`, { headers: this.getHeaders(), withCredentials: true });
  }

  // pausarDespausarArquivo( arquivoId: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/${arquivoId}/pausarDespausarArquivo`, { headers: this.getHeaders(), withCredentials: true });
  // }

  aprovarArquivo(arquivoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${arquivoId}/aprovarArquivo`, {}, { headers: this.getHeaders(), withCredentials: true });
  }
 
  reprovarArquivo(arquivoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${arquivoId}/reprovarArquivo`, {}, { headers: this.getHeaders(), withCredentials: true });
  }

  // Adicione outros métodos conforme necessário para editar, visualizar e carregar arquivos
}
