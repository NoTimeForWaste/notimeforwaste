import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoPage } from './pedido.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoPage
  },
  {
    path: 'novo-pedido',
    loadChildren: () => import('./novo-pedido/novo-pedido.module').then( m => m.NovoPedidoPageModule)
  },
  {
    path: 'detalhes-pedido',
    loadChildren: () => import('./detalhes-pedido/detalhes-pedido.module').then( m => m.DetalhesPedidoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPageRoutingModule {}
