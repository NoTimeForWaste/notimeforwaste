import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco } from 'src/app/model/endereco';

@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.page.html',
  styleUrls: ['./novo-endereco.page.scss'],
})
export class NovoEnderecoPage implements OnInit {


  endereco: Endereco;
  formGroup: FormGroup;

  constructor(private fBuilder: FormBuilder) {
    this.endereco = new Endereco();
    this.formGroup = this.fBuilder.group(
      {
        'cep': [this.endereco.cep, Validators.compose([
          Validators.required])],
        'uf': [this.endereco.estado, Validators.compose([
          Validators.required,
        ])],
        'bairro': [this.endereco.bairro, Validators.compose([
          Validators.required
        ])],
        'rua': [this.endereco.rua, Validators.compose([
          Validators.required
        ])],
        'numero': [this.endereco.numero, Validators.compose([
          Validators.required
        ])],
        'complemento': [this.endereco.complemento, Validators.compose([
          Validators.required
        ])],
        'cidade': [this.endereco.cidade, Validators.compose([
          Validators.required
        ])]
      }
    );
  }


  ngOnInit() {
  }

}
