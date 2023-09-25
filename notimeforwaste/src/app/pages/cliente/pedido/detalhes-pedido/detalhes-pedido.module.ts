import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPedidoPageRoutingModule } from './detalhes-pedido-routing.module';

import { DetalhesPedidoPage } from './detalhes-pedido.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesPedidoPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [DetalhesPedidoPage]
})
export class DetalhesPedidoPageModule {}
