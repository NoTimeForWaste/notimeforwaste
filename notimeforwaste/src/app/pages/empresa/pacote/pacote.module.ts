import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacotePageRoutingModule } from './pacote-routing.module';

import { PacotePage } from './pacote.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacotePageRoutingModule,
    FontAwesomeModule,
    RouterLink
  ],
  declarations: [PacotePage]
})
export class PacotePageModule {}
