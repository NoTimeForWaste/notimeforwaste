import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarContaPage } from './editar-conta.page';

const routes: Routes = [
  {
    path: '',
    component: EditarContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarContaPageRoutingModule {}
