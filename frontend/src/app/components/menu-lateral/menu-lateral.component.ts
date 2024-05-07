import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {
  
  constructor( public router: Router) {}

  Home() {
    this.router.navigate(['/']); 
  }

}
