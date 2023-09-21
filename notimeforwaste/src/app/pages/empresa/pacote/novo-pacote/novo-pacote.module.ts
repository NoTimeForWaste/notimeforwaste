import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoPacotePageRoutingModule } from './novo-pacote-routing.module';

import { NovoPacotePage } from './novo-pacote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoPacotePageRoutingModule
  ],
  declarations: [NovoPacotePage]
})
export class NovoPacotePageModule {}
