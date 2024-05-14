import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-enviar-arquivo',
  standalone: true,
  imports: [],
  templateUrl: './enviar-arquivo.component.html',
  styleUrls: ['./enviar-arquivo.component.scss'] // Corrigido para styleUrls
})

export class EnviarArquivoComponent {
  file: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(event: Event) {
    if (!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post<any>('http://localhost:8080/arquivos/upload', formData).subscribe(
      (response) => {
        console.log('Arquivo enviado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao enviar arquivo:', error);
      }
    );
  }
}
