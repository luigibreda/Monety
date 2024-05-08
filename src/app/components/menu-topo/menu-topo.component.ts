import { Component } from '@angular/core';
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
export class MenuTopoComponent {
  
  constructor(public authGuard: AuthGuard, private loginService: LoginService, private router: Router) {}

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
