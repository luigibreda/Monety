import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../types/usuario.type';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  usuario: Usuario = {
    name: '',
    email: '',
    id: '',
    token: '',
    isAdmin: false,
    ativo: false,
    userId: '',
    createdAt: '',
    updatedAt: '',
    nome: ''
  };

  constructor(public loginService: LoginService, private usuariosService: UsuariosService, private toastService: ToastrService) { }

  
  ngOnInit(): void {
    this.carregarUsuario(); // Chama o método para carregar os usuários ao iniciar o componente
  }

  carregarUsuario(): void {
    const id = sessionStorage.getItem('userId') || '';
    this.usuariosService.getUsuario(id).subscribe(usuario => {
          this.usuario = usuario;
      });
  }

  atualizarUsuario(): void {
    const id = sessionStorage.getItem('userId') || '';
    this.usuariosService.atualizaUsuario(id, this.usuario).subscribe({
      next: () => this.toastService.success("Perfil atualizado com sucesso!"),
      error: () => this.toastService.error("Erro ao atualizar perfil.")
    });
  }

}
