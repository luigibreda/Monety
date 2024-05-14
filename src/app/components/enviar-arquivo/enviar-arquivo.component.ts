import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ArquivosService } from '../../services/arquivo.service';

@Component({
  selector: 'app-enviar-arquivo',
  standalone: true,
  imports: [],
  templateUrl: './enviar-arquivo.component.html',
  styleUrls: ['./enviar-arquivo.component.scss'] // Corrigido para styleUrls
})

export class EnviarArquivoComponent {
  file: File | null = null;

  constructor(private http: HttpClient, public arquivoService: ArquivosService, private toastr: ToastrService) {}

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.file) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);

    // this.http.post<any>('http://localhost:8080/arquivos/upload', formData).subscribe(
    //   (response) => {
    //     console.log('Arquivo enviado com sucesso!', response);
    //   },
    //   (error) => {
    //     console.error('Erro ao enviar arquivo:', error);
    //   }
    // );

      this.arquivoService.uploadArquivo(formData).subscribe(
        () => {
          this.toastr.success('Arquivo enviado com sucesso.');
        },
        error => {
          console.error('Erro ao enviar arquivo:', error);
          this.toastr.error('Erro ao enviar arquivo. Por favor, tente novamente mais tarde.');
        }
      );
    

  }
}
