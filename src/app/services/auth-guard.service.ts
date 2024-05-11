import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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

    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
  isAuthenticated(): boolean {
    const authToken = sessionStorage.getItem('auth-token');
    return !!authToken; // Retorna true se authToken existe
  }

  getUserName(): string | null {
    return sessionStorage.getItem('username');
  }

  getUserEmail(): string | null {
    return sessionStorage.getItem('useremail');
  }
  
}
