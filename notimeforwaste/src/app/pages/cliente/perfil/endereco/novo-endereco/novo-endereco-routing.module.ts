import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoEnderecoPage } from './novo-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: NovoEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoEnderecoPageRoutingModule {}
