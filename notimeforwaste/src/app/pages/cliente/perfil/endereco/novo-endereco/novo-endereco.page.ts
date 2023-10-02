import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.page.html',
  styleUrls: ['./novo-endereco.page.scss'],
})
export class NovoEnderecoPage implements OnInit {


  uf?: String;
  bairro?: String;
  cep?: String;
  rua?: String;
  numero?: String;
  complemento?: String;
  formGroup: FormGroup;
  
  constructor(private fBuilder: FormBuilder) {
    this.formGroup = this.fBuilder.group(
      {
        'cep': [this.cep, Validators.compose([
          Validators.required])],
        'uf': [this.uf, Validators.compose([
          Validators.required,
        ])],
        'bairro': [this.bairro, Validators.compose([
          Validators.required
        ])],
        'rua': ['', Validators.compose([
          Validators.required
        ])],
        'numero': ['', Validators.compose([
          Validators.required
        ])],
        'complemento': ['', Validators.compose([
          Validators.required
        ])]
      }
    );
  }
   

  ngOnInit() {
  }

}
