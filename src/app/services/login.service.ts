import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "https://monety-backend2.vercel.app/auth"

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        this.router.navigate(['/dashboard']); 
      })
    )
  }

  signup(name: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
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
