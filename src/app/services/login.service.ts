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
        sessionStorage.setItem('auth-token', response.token);
        sessionStorage.setItem('username', response.userName);
        sessionStorage.setItem('useremail', response.userEmail);
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
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('useremail'); 
    this.router.navigate(['/']);
  }
}
