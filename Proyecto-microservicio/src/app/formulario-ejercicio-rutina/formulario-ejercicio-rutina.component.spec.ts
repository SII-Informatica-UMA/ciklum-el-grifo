import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEjercicioRutinaComponent } from './formulario-ejercicio-rutina.component';

describe('FormularioEjercicioRutinaComponent', () => {
  let component: FormularioEjercicioRutinaComponent;
  let fixture: ComponentFixture<FormularioEjercicioRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEjercicioRutinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioEjercicioRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
