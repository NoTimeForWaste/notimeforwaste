import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarContaPage } from './editar-conta.page';

describe('EditarContaPage', () => {
  let component: EditarContaPage;
  let fixture: ComponentFixture<EditarContaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
