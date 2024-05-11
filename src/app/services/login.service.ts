import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/entrar`, { email, password }).pipe(
      tap((response) => {
        // Armazena o token JWT na sessão
        sessionStorage.setItem('auth-token', response.token);
        
        // Armazena o nome do usuário na sessão
        sessionStorage.setItem('username', response.userName);

        // Navega para a página de dashboard após o login
        this.router.navigate(['/dashboard']);
      })
    );
  }

    signup(name: string, email: string, password: string, confirmPassword: string){
      return this.httpClient.post<LoginResponse>(this.apiUrl + "/auth/registrar", { name, email, password, confirmPassword }).pipe(
        tap((value) => {
          this.router.navigate(['/login']); 
        })
      )
  }

  logout() {
    // Limpa os dados de autenticação armazenados na sessão
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');

    // Redireciona o usuário para a página de login
    this.router.navigate(['/']);
  }

}
