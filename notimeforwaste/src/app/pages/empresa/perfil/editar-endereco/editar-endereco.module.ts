import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarEnderecoPageRoutingModule } from './editar-endereco-routing.module';

import { EditarEnderecoPage } from './editar-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarEnderecoPageRoutingModule
  ],
  declarations: [EditarEnderecoPage]
})
export class EditarEnderecoPageModule {}
