import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacotePageRoutingModule } from './pacote-routing.module';

import { PacotePage } from './pacote.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacotePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [PacotePage]
})
export class PacotePageModule {}
