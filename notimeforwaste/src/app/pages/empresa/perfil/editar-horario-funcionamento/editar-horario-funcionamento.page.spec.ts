import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarHorarioFuncionamentoPage } from './editar-horario-funcionamento.page';

describe('EditarHorarioFuncionamentoPage', () => {
  let component: EditarHorarioFuncionamentoPage;
  let fixture: ComponentFixture<EditarHorarioFuncionamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarHorarioFuncionamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
