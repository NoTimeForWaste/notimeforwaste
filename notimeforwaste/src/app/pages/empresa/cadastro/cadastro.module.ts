import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxViacepModule } from "@brunoc/ngx-viacep"; // Importando o módulo
import { IConfig, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxViacepModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}
