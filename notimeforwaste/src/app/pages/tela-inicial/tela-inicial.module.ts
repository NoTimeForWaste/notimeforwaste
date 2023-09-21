import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaInicialPageRoutingModule } from './tela-inicial-routing.module';

import { TelaInicialPage } from './tela-inicial.page';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaInicialPageRoutingModule,
    RouterLink,
    RouterLinkActive
  ],
  declarations: [TelaInicialPage]
})
export class TelaInicialPageModule {}
