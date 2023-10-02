import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarEnderecoPageRoutingModule } from './editar-endereco-routing.module';

import { EditarEnderecoPage } from './editar-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarEnderecoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarEnderecoPage]
})
export class EditarEnderecoPageModule {}
