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
  page: number = 0;
  limit: number = 5;
  totalPage: number = 1; // Inicializa com 1 para evitar NaN no template
  searchQuery: string = '';
  currentPage: number = 0;

  constructor(private usuariosService: UsuariosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuariosService.getUsuarios(this.page, this.limit, this.searchQuery).subscribe(
      response => {
        this.usuarios = response.result;
        this.page = response.page;
        this.limit = response.limit;
        this.totalPage = response.totalPage;
        this.currentPage = this.page;
      },
      error => {
        console.error('Erro ao carregar usuários:', error);
        this.toastr.error('Erro ao carregar usuários. Por favor, tente novamente mais tarde.');
      }
    );
  }

  carregarPagina(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 0 && page < this.totalPage) {
      this.page = page;
      this.carregarUsuarios();
    }
  }

  confirmarExclusao(id: string): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.deletarUsuario(id);
    }
  }

  deletarUsuario(id: string): void {
    this.usuariosService.deletaUsuario(id).subscribe(
      () => {
        this.toastr.success('Usuário excluído com sucesso.');
        this.carregarUsuarios(); // Atualiza a lista após a exclusão
      },
      error => {
        console.error('Erro ao excluir usuário:', error);
        this.toastr.error('Erro ao excluir usuário. Por favor, tente novamente mais tarde.');
      }
    );
  }

  getPagesArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (v, k) => k);
  }
}
