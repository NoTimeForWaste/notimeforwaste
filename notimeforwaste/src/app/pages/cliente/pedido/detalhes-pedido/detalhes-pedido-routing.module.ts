import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesPedidoPage } from './detalhes-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesPedidoPageRoutingModule {}
