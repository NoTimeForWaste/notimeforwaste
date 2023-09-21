import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEnderecoPage } from './editar-endereco.page';

describe('EditarEnderecoPage', () => {
  let component: EditarEnderecoPage;
  let fixture: ComponentFixture<EditarEnderecoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarEnderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
