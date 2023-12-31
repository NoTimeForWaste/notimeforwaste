import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecoPageRoutingModule } from './endereco-routing.module';

import { EnderecoPage } from './endereco.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePageRoutingModule } from '../../home/home-routing.module';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoPageRoutingModule,
    HomePageRoutingModule,
    FontAwesomeModule,
    RouterLink
  ],
  declarations: [EnderecoPage]
})
export class EnderecoPageModule {}
