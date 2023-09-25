import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoPacotePageRoutingModule } from './novo-pacote-routing.module';

import { NovoPacotePage } from './novo-pacote.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoPacotePageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule

  ],
  declarations: [NovoPacotePage]
})
export class NovoPacotePageModule { }
