import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArquivosService } from '../../services/arquivo.service';
import { Arquivo } from '../../types/arquivo.type';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../services/auth-guard.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-arquivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arquivo.component.html',
  styleUrl: './arquivo.component.scss'
})
export class ArquivoComponent {
  
  arquivo: Arquivo | null = null;
  erro: string | null = null;

  constructor(private route: ActivatedRoute, private arquivosService: ArquivosService, private toastr: ToastrService, public authguard: AuthGuard) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const arquivoId = params['id'];
      if (arquivoId) {
        this.carregarArquivo(arquivoId);
      } else {
        console.error('ID do arquivo não fornecido na URL.');
        this.toastr.error('ID do arquivo não fornecido na URL.');
      }
    });
  }

  carregarArquivo(arquivoId: string): void {
    this.arquivosService.getArquivo(arquivoId).subscribe(
      (response: any) => {
        if (response) {
          this.arquivo = response;
        } else {
          console.error('Arquivo não encontrado:', response.error);
          this.erro = 'O arquivo não existe ou não foi encontrado.';
          this.toastr.error('Arquivo não encontrado.');
        }
      },  
      (error: any) => {
        console.error('Erro ao carregar arquivo:', error);
        this.erro = 'Erro ao carregar arquivo. Por favor, tente novamente mais tarde.';
        this.toastr.error(this.erro);
      }
    );
  }
  downloadLink(): string {
    if (this.arquivo) {
      return `${environment.apiUrl}/baixar/${this.arquivo.id}`;
    }
    return '#'; // Retorna '#' se não houver arquivo ou caminho
  }

  formataTamanho(size: string | undefined): string {
    if (!size) return '0 MB';
    const sizeInMB = (parseFloat(size) / (1024 * 1024)).toFixed(2);
    return `${sizeInMB} MB`;
  }

  formataDownloads(downloads: string): string {
    if (!downloads) return '0 downloads';
    return `${downloads} downloads`;
  }
  
}
