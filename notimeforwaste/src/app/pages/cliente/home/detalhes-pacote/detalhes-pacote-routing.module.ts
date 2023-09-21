import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesPacotePage } from './detalhes-pacote.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPacotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesPacotePageRoutingModule {}
