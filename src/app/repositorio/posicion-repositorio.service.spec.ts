import { TestBed } from '@angular/core/testing';

import { PosicionRepositorioService } from './posicion-repositorio.service';

describe('PosicionRepositorioService', () => {
  let service: PosicionRepositorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosicionRepositorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});