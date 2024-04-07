import { TestBed } from '@angular/core/testing';

import { EjercicioRutinaService } from './ejercicio-rutina.service';

describe('EjercicioRutinaService', () => {
  let service: EjercicioRutinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioRutinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
