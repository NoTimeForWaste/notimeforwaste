import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnderecoPage } from './endereco.page';

const routes: Routes = [
  {
    path: '',
    component: EnderecoPage
  },
  {
    path: 'novo-endereco',
    loadChildren: () => import('./novo-endereco/novo-endereco.module').then( m => m.NovoEnderecoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoPageRoutingModule {}
