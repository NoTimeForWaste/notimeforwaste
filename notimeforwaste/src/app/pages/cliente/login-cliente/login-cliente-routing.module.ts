import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginClientePage } from './login-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: LoginClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginClientePageRoutingModule {}
