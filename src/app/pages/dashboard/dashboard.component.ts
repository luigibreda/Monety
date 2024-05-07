import { Component } from '@angular/core';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { MenuTopoComponent } from '../../components/menu-topo/menu-topo.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuLateralComponent, MenuTopoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
