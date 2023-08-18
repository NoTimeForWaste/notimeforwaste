import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaInicialPage } from './tela-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TelaInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaInicialPageRoutingModule {}
