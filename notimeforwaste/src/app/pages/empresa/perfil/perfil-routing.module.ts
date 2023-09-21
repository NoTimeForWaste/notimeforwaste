import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  },
  {
    path: 'editar-conta',
    loadChildren: () => import('./editar-conta/editar-conta.module').then( m => m.EditarContaPageModule)
  },
  {
    path: 'editar-endereco',
    loadChildren: () => import('./editar-endereco/editar-endereco.module').then( m => m.EditarEnderecoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
