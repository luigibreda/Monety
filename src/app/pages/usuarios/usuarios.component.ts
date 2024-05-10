import { Component } from '@angular/core';
import { ListaUsuariosComponent } from '../../components/lista-usuarios/lista-usuarios.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ListaUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

}
