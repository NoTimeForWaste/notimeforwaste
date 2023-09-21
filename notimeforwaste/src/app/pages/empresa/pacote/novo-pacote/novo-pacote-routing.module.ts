import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoPacotePage } from './novo-pacote.page';

const routes: Routes = [
  {
    path: '',
    component: NovoPacotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoPacotePageRoutingModule {}
