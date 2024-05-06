import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { MenuTopoComponent } from './components/menu-topo/menu-topo.component';
import { AuthGuard } from './services/auth-guard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuLateralComponent, MenuTopoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'login-page';

  constructor(public authGuard: AuthGuard, private router: Router) { }

}

