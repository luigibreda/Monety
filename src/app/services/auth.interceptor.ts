import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      // Clone a requisição e substitua o cabeçalho original com o cabeçalho de autorização
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });

      // Envia a nova requisição com o cabeçalho de autorização
      return next.handle(authReq);
    }

    // Se não tiver token, apenas encaminha a requisição original
    return next.handle(req);
  }
}