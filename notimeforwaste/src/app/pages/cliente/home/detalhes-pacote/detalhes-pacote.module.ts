import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPacotePageRoutingModule } from './detalhes-pacote-routing.module';

import { DetalhesPacotePage } from './detalhes-pacote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesPacotePageRoutingModule
  ],
  declarations: [DetalhesPacotePage]
})
export class DetalhesPacotePageModule {}
