import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosRutinaComponent } from './ejercicios-rutina.component';

describe('EjerciciosRutinaComponent', () => {
  let component: EjerciciosRutinaComponent;
  let fixture: ComponentFixture<EjerciciosRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjerciciosRutinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjerciciosRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
