import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesPacotePage } from './detalhes-pacote.page';

describe('DetalhesPacotePage', () => {
  let component: DetalhesPacotePage;
  let fixture: ComponentFixture<DetalhesPacotePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalhesPacotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
