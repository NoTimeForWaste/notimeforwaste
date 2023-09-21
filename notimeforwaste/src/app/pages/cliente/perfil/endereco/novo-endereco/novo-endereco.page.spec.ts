import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoEnderecoPage } from './novo-endereco.page';

describe('NovoEnderecoPage', () => {
  let component: NovoEnderecoPage;
  let fixture: ComponentFixture<NovoEnderecoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovoEnderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
