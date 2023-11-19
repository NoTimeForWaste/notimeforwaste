import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoPedidoPageRoutingModule } from './novo-pedido-routing.module';

import { NovoPedidoPage } from './novo-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoPedidoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NovoPedidoPage]
})
export class NovoPedidoPageModule {}
