import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroClientePage } from './cadastro-cliente.page';

describe('CadastroClientePage', () => {
  let component: CadastroClientePage;
  let fixture: ComponentFixture<CadastroClientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
