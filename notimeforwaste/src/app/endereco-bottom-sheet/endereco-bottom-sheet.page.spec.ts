import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnderecoBottomSheetPage } from './endereco-bottom-sheet.page';

describe('EnderecoBottomSheetPage', () => {
  let component: EnderecoBottomSheetPage;
  let fixture: ComponentFixture<EnderecoBottomSheetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnderecoBottomSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
