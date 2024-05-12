import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../types/usuario.type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.carregarUsuarios(); // Chama o método para carregar os usuários ao iniciar o componente
  }

  carregarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  confirmarExclusao(id: string): void {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      // Lógica para excluir o usuário com o ID fornecido
      this.deletaUsuario(id);
      console.log("Usuário com ID", id, "excluído.");
    }
  }

  deletaUsuario(id: string): void {
    this.usuariosService.deletaUsuario(id).subscribe({
      next: (response) => {
        console.log('Usuário deletado com sucesso');
        this.toastService.success("Usuário deletado com sucesso");
        this.carregarUsuarios(); // Atualiza os dados da tabela após a exclusão bem-sucedida
      },
      error: (error) => {
        this.toastService.error("Erro Statuss: " + (error.error && error.error.mensagem ? error.error.mensagem : error.status));
        console.error('Erro ao deletar usuário', error.message);
      }
    });
  }

}
