import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosArquivosComponent } from './infos-arquivos.component';

describe('InfosArquivosComponent', () => {
  let component: InfosArquivosComponent;
  let fixture: ComponentFixture<InfosArquivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosArquivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfosArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
