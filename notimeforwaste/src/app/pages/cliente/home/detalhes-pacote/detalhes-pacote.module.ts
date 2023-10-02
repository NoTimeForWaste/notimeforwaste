import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPacotePageRoutingModule } from './detalhes-pacote-routing.module';

import { DetalhesPacotePage } from './detalhes-pacote.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesPacotePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [DetalhesPacotePage]
})
export class DetalhesPacotePageModule {}
