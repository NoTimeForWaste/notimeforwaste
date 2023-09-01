import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginClientePage } from './login-cliente.page';

describe('LoginClientePage', () => {
  let component: LoginClientePage;
  let fixture: ComponentFixture<LoginClientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
