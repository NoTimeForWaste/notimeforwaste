import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusDadosPage } from './meus-dados.page';

describe('MeusDadosPage', () => {
  let component: MeusDadosPage;
  let fixture: ComponentFixture<MeusDadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeusDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
