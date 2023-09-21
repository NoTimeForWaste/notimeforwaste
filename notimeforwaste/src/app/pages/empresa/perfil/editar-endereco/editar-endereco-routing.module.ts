import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarEnderecoPage } from './editar-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: EditarEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarEnderecoPageRoutingModule {}
