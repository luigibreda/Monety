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

  constructor(public authGuard: AuthGuard, public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
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
