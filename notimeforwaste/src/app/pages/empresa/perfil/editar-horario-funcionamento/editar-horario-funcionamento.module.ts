import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarHorarioFuncionamentoPageRoutingModule } from './editar-horario-funcionamento-routing.module';

import { EditarHorarioFuncionamentoPage } from './editar-horario-funcionamento.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarHorarioFuncionamentoPageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  declarations: [EditarHorarioFuncionamentoPage]
})
export class EditarHorarioFuncionamentoPageModule {}
