import { Component, OnInit } from '@angular/core';
import { ArquivosService } from '../../services/arquivo.service';
import { Arquivos } from '../../types/arquivo.type';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common'; // Importação do CommonModule e DatePipe

@Component({
  selector: 'app-lista-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.scss']
})
export class ArquivosComponent implements OnInit {

  arquivos: Arquivos[] = [];

  constructor(private arquivosService: ArquivosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarArquivos();
  }

  carregarArquivos(): void {
    this.arquivosService.getAllArquivos().subscribe(
      (arquivos: Arquivos[]) => {
        this.arquivos = arquivos;
      },
      (error: any) => {
        console.error('Erro ao carregar arquivos:', error);
        this.toastr.error('Erro ao carregar arquivos. Por favor, tente novamente mais tarde.');
      }
    );
  }

  confirmarExclusao(userId: string, arquivoId: string): void {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      this.deletarArquivo(userId, arquivoId);
    }
  }

  deletarArquivo(userId: string, arquivoId: string): void {
    this.arquivosService.deleteArquivo(userId, arquivoId).subscribe(
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
}
