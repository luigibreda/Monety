import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../services/auth-guard.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-topo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu-topo.component.html',
  styleUrl: './menu-topo.component.scss'
})
export class MenuTopoComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';

  constructor(public authGuard: AuthGuard, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.updateUserInfo();
  }

  updateUserInfo(): void {
    const authToken = sessionStorage.getItem('auth-token');
    if (authToken) {
      const tokenPayload = JSON.parse(atob(authToken.split('.')[1]));
      this.userName = tokenPayload.userName;
      this.userEmail = tokenPayload.userEmail; 
    }
  }

  sair() {
    this.loginService.logout();
  }

  Home() {
    this.router.navigate(['/']); 
  }

  Login() {
    this.router.navigate(['/login']); 
  }

  Registrar() {
    this.router.navigate(['/signup']); 
  }
}
