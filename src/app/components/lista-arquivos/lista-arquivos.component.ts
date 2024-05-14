import { Component, OnInit } from '@angular/core';
import { ArquivosService } from '../../services/arquivo.service';
import { Arquivo } from '../../types/arquivo.type';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; // Importação do CommonModule e DatePipe
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';

@Component({
  selector: 'app-lista-arquivos',
  templateUrl: './lista-arquivos.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./lista-arquivos.component.scss']
})
export class ListaArquivosComponent implements OnInit {

  arquivos: Arquivo[] = [];

  constructor(private arquivosService: ArquivosService, private toastr: ToastrService, private router: Router, public authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.carregarArquivos();
  }

  carregarArquivos(): void {
    this.arquivosService.getAllArquivos().subscribe(
      (response: any) => {
        if (Array.isArray(response.result)) { // Verifique se response.result é uma matriz
          this.arquivos = response.result;
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
  

  confirmarExclusao( arquivoId: string): void {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      this.deletarArquivo( arquivoId);
    }
  }

  deletarArquivo( arquivoId: string): void {
    this.arquivosService.deleteArquivo( arquivoId).subscribe(
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
    // this.router.navigate(['/arquivo', arquivoId]);
    const url = `/arquivo/${arquivoId}`;
    window.open(url, '_blank');
  }

  aprovarArquivo(arquivoId: string): void {
    this.arquivosService.aprovarArquivo( arquivoId).subscribe(
      () => {
        this.toastr.success('Arquivo aprovado com sucesso.');
        this.carregarArquivos(); // Atualiza a lista após a exclusão
      },
      (error: any) => {
        console.error('Erro ao aprovar arquivo:', error);
        this.toastr.error('Erro ao aporovar arquivo. Por favor, tente novamente mais tarde.');
      }
    );
  }

  reprovarArquivo(arquivoId: string): void {
    this.arquivosService.reprovarArquivo( arquivoId).subscribe(
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

  copiarLink(link: string) {
    // Cria um elemento de texto temporário
    const inputElement = document.createElement('input');
    inputElement.value = link;
    document.body.appendChild(inputElement);
    // Seleciona o texto dentro do elemento de texto
    inputElement.select();
    // Copia o texto selecionado para a área de transferência
    document.execCommand('copy');
    // Remove o elemento de texto temporário
    document.body.removeChild(inputElement);
  }
  
}
