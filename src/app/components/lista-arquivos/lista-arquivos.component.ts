import { Component, OnInit } from '@angular/core';
import { ArquivosService } from '../../services/arquivo.service';
import { Arquivo } from '../../types/arquivo.type';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; // Importação do CommonModule e DatePipe
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';
import { InfosArquivosComponent } from '../infos-arquivos/infos-arquivos.component';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms'; // Importação do FormsModule

@Component({
  selector: 'app-lista-arquivos',
  templateUrl: './lista-arquivos.component.html',
  imports: [CommonModule, InfosArquivosComponent, FormsModule], // Adicionando FormsModule aqui
  standalone: true,
  styleUrls: ['./lista-arquivos.component.scss']
})
export class ListaArquivosComponent implements OnInit {

  arquivos: Arquivo[] = [];
  currentPage = 0;
  page: number = 0;
  totalPages: number[] = [];
  limit = 5;
  totalRows = 0;
  searchQuery: string = '';
  
  constructor(private arquivosService: ArquivosService, private toastr: ToastrService, private router: Router, public authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.carregarArquivos();
  }

  carregarArquivos(): void {
    this.arquivosService.getAllArquivos(this.currentPage, this.limit, this.searchQuery).subscribe(
      (response: any) => {
        if (Array.isArray(response.result)) {
          this.arquivos = response.result;
          this.page = response.page;
          this.totalRows = response.totalRows;
          this.totalPages = Array.from({ length: response.totalPage }, (_, index) => index + 1);
        } else {
          console.error('Erro ao carregar arquivos: response.result não é uma matriz');
          this.toastr.error('Erro ao carregar arquivos. Por favor, tente novamente mais tarde.');
        }
      },
      (error: any) => {
        console.error('Erro ao carregar arquivos:', error);
        this.toastr.error('Erro ao carregar arquivos. Por favor, tente novamente mais tarde.');
      }
    );
  }

  carregarPagina(page: number, event: MouseEvent): void {
    event.preventDefault();
    this.currentPage = page;
    this.carregarArquivos();
  }
  
  onSearch(event: Event): void {
    event.preventDefault();
    this.page = 0; 
    this.carregarArquivos();
  }

  confirmarExclusao(arquivoId: string): void {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      this.deletarArquivo(arquivoId);
    }
  }

  deletarArquivo(arquivoId: string): void {
    this.arquivosService.deleteArquivo(arquivoId).subscribe(
      () => {
        this.toastr.success('Arquivo excluído com sucesso.');
        this.carregarArquivos(); // Atualiza a lista após a exclusão
      },
      (error: any) => {
        console.error('Erro ao excluir arquivo:', error);
        this.toastr.error('Erro ao excluir arquivo. Por favor, tente novamente mais tarde.');
      }
    );
  }

  redirecionarParaArquivo(arquivoId: string) {
    const url = `/arquivo/${arquivoId}`;
    window.open(url, '_blank');
  }

  aprovarArquivo(arquivoId: string): void {
    this.arquivosService.aprovarArquivo(arquivoId).subscribe(
      () => {
        this.toastr.success('Arquivo aprovado com sucesso.');
        this.carregarArquivos(); // Atualiza a lista após a exclusão
      },
      (error: any) => {
        console.error('Erro ao aprovar arquivo:', error);
        this.toastr.error('Erro ao aprovar arquivo. Por favor, tente novamente mais tarde.');
      }
    );
  }

  reprovarArquivo(arquivoId: string): void {
    this.arquivosService.reprovarArquivo(arquivoId).subscribe(
      () => {
        this.toastr.success('Arquivo reprovado com sucesso.');
        this.carregarArquivos(); // Atualiza a lista após a exclusão
      },
      (error: any) => {
        console.error('Erro ao reprovar arquivo:', error);
        this.toastr.error('Erro ao reprovar arquivo. Por favor, tente novamente mais tarde.');
      }
    );
  }

  copiarLink(id: string) {
    const inputElement = document.createElement('input');
    inputElement.value = location.origin + `/arquivo/${id}`;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);
  }
}
