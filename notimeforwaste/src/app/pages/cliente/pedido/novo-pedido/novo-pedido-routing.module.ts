import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoPedidoPage } from './novo-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: NovoPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoPedidoPageRoutingModule {}
