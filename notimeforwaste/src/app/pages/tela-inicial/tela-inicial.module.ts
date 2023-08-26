import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaInicialPageRoutingModule } from './tela-inicial-routing.module';

import { TelaInicialPage } from './tela-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaInicialPageRoutingModule
  ],
  declarations: [TelaInicialPage]
})
export class TelaInicialPageModule {}
