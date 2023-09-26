import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {
  email?: String;
  senha?: String;
  nome?: String;
  formGroup: FormGroup;

  constructor() { 
    this.formGroup = this.fBuilder.group(
      {
        'nome': [this.nome, Validators.compose([
          Validators.required])],
        'email': [this.email, Validators.compose([
          Validators.required,
          Validators.email
        ])],
        'senha': [this.senha, Validators.compose([
          Validators.required
        ])],

      }
    );
  }

  ngOnInit() {
  }

}
