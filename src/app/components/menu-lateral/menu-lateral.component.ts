import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {
  
  constructor(public authGuard: AuthGuard, public router: Router) {}

  Home() {
    this.router.navigate(['/']); 
  }

}
