import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginClientePageRoutingModule } from './login-cliente-routing.module';

import { LoginClientePage } from './login-cliente.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginClientePageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [LoginClientePage]
})
export class LoginClientePageModule {}
