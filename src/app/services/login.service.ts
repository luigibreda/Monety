import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../types/login-response.type';
import { CookieService } from 'ngx-cookie-service'; // Importe o CookieService

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/entrar`, { email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token);
        const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
        sessionStorage.setItem('userName', tokenPayload.userName);
        sessionStorage.setItem('userEmail', tokenPayload.userEmail);    
        sessionStorage.setItem('userId', tokenPayload.userId);    
        sessionStorage.setItem('isAdmin', tokenPayload.isAdmin);    

        this.router.navigate(['/dashboard']);
        })
    );
  }

  signup(name: string, email: string, password: string, confirmPassword: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/auth/registrar", { name, email, password, confirmPassword }, { withCredentials: true }).pipe(
      tap((value) => {
        this.router.navigate(['/login']); 
      })
    )
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');   
    sessionStorage.removeItem('userId');    
    sessionStorage.removeItem('isAdmin');    
    this.cookieService.delete('refreshToken');
    this.router.navigate(['/']);
  }
  
  getUserName(): string | null {
    return sessionStorage.getItem('userName');
  }

  getUserEmail(): string | null {
    return sessionStorage.getItem('userEmail');
  }

}
