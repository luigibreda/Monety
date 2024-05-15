import { Component, OnInit } from '@angular/core';
import { ArquivosService } from '../../services/arquivo.service';
import { Arquivo } from '../../types/arquivo.type';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; // Importação do CommonModule e DatePipe
import { ListaArquivosComponent } from '../../components/lista-arquivos/lista-arquivos.component';
import { InfosArquivosComponent } from '../../components/infos-arquivos/infos-arquivos.component';
import { EnviarArquivoComponent } from '../../components/enviar-arquivo/enviar-arquivo.component';
@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  imports: [CommonModule, ListaArquivosComponent, InfosArquivosComponent, EnviarArquivoComponent],
  standalone: true,
  styleUrls: ['./arquivos.component.scss']
})
export class ArquivosComponent implements OnInit {

  arquivos: Arquivo[] = [];

  constructor(private arquivosService: ArquivosService, private toastr: ToastrService) { }

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
  
}
