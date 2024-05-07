import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  title = 'home-page';

  constructor(private router: Router) { }

  
  Login() {
    this.router.navigate(['/login']); 
  }

  Registrar() {
    this.router.navigate(['/signup']); 
  }
}
