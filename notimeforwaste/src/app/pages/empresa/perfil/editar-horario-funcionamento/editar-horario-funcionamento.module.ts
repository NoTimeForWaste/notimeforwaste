import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarHorarioFuncionamentoPageRoutingModule } from './editar-horario-funcionamento-routing.module';

import { EditarHorarioFuncionamentoPage } from './editar-horario-funcionamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarHorarioFuncionamentoPageRoutingModule
  ],
  declarations: [EditarHorarioFuncionamentoPage]
})
export class EditarHorarioFuncionamentoPageModule {}
