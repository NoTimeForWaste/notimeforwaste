import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Empresa } from 'src/app/model/empresa';
import { Endereco } from 'src/app/model/endereco';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-editar-endereco',
  templateUrl: './editar-endereco.page.html',
  styleUrls: ['./editar-endereco.page.scss'],
})
export class EditarEnderecoPage implements OnInit {

 
  endereco: Endereco;
  formGroup: FormGroup;
  empresa: Empresa;
  constructor(private fBuilder: FormBuilder, private enderecoService: EnderecoService, private empresaService: EmpresaService) {
   this.empresa = this.empresaService.getEmpresaLogada();
   this.endereco = new Endereco();
    this.getEndereco();
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

   getEndereco(){
    this.enderecoService.getById(this.empresa.idEndereco).subscribe((endereco)=>{
      this.endereco = <Endereco>(endereco);
      console.log(endereco)
    })
  }


  ngOnInit() {
  }

} 
