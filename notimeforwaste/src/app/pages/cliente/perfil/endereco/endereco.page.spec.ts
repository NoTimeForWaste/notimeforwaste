import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnderecoPage } from './endereco.page';

describe('EnderecoPage', () => {
  let component: EnderecoPage;
  let fixture: ComponentFixture<EnderecoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
