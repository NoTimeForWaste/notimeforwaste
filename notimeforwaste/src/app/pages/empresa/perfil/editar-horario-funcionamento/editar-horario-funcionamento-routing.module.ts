import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarHorarioFuncionamentoPage } from './editar-horario-funcionamento.page';

const routes: Routes = [
  {
    path: '',
    component: EditarHorarioFuncionamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarHorarioFuncionamentoPageRoutingModule {}
