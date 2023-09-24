import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoEnderecoPageRoutingModule } from './novo-endereco-routing.module';

import { NovoEnderecoPage } from './novo-endereco.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoEnderecoPageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [NovoEnderecoPage]
})
export class NovoEnderecoPageModule {}
