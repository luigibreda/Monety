import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}