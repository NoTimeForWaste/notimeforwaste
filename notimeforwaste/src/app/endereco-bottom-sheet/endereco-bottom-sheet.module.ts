import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecoBottomSheetPageRoutingModule } from './endereco-bottom-sheet-routing.module';

import { EnderecoBottomSheetPage } from './endereco-bottom-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoBottomSheetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EnderecoBottomSheetPage]
})
export class EnderecoBottomSheetPageModule {}
