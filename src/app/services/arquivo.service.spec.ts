import { TestBed } from '@angular/core/testing';

import { ArquivosService } from './arquivo.service';

describe('ArquivosService', () => {
  let service: ArquivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArquivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
