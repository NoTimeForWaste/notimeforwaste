import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoPedidoPage } from './novo-pedido.page';

describe('NovoPedidoPage', () => {
  let component: NovoPedidoPage;
  let fixture: ComponentFixture<NovoPedidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovoPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
