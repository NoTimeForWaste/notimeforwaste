import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacotePage } from './pacote.page';

const routes: Routes = [
  {
    path: '',
    component: PacotePage
  },
  {
    path: 'novo-pacote',
    loadChildren: () => import('./novo-pacote/novo-pacote.module').then( m => m.NovoPacotePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacotePageRoutingModule {}
