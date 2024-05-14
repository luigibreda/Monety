import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');
    const isAdminRoute = next.data['isAdmin']; // Verifica se a rota requer privilégios de administrador

    if (authToken) {
      if (isAdminRoute && !this.isAdmin()) {
        this.router.navigate(['/dashboard']); // Redireciona para uma página de "não autorizado"
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isAuthenticated(): boolean {
    const isAuthenticated = sessionStorage.getItem('auth-token');
    return !!isAuthenticated; // Retorna true se authToken existe
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('isAdmin') === 'true';
  }
}
