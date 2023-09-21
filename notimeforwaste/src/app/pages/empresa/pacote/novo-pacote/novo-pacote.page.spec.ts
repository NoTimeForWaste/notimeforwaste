import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoPacotePage } from './novo-pacote.page';

describe('NovoPacotePage', () => {
  let component: NovoPacotePage;
  let fixture: ComponentFixture<NovoPacotePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NovoPacotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
