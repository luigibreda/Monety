import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarArquivoComponent } from './enviar-arquivo.component';

describe('EnviarArquivoComponent', () => {
  let component: EnviarArquivoComponent;
  let fixture: ComponentFixture<EnviarArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnviarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
