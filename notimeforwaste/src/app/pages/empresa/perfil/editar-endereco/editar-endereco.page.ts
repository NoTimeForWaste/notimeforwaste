import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Empresa } from 'src/app/model/empresa';
import { Endereco } from 'src/app/model/endereco';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEndereco } from 'src/app/types/IEndereco';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-endereco',
  templateUrl: './editar-endereco.page.html',
  styleUrls: ['./editar-endereco.page.scss'],
})
export class EditarEnderecoPage implements OnInit {


  endereco: Endereco;
  formGroup: FormGroup;
  empresa: Empresa;
  constructor(private toastController: ToastController, private http: HttpClient, private fBuilder: FormBuilder, private enderecoService: EnderecoService, private empresaService: EmpresaService) {
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
    const cep = this.formGroup.value.cep;
    const cepNumeros = cep?.replace(/\D/g, '');
    this.formGroup.get('cep')?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(cep => {
      const cepNumeros = cep.replace(/\D/g, '');
      if (cepNumeros.length === 8) {
        this.http.get<IEndereco>(`https://viacep.com.br/ws/${cepNumeros}/json/`).subscribe(dados => {
          this.formGroup.patchValue({
            'uf': dados.uf,
            'bairro': dados.bairro,
            'cidade': dados.localidade,
            'rua': dados.logradouro,
          });
        });
      } else {
        this.formGroup.patchValue({
          'uf': '',
          'bairro': '',
          'cidade': '',
          'rua': '',
        });
      }
    });
  }

  getEndereco() {
    this.enderecoService.getById(this.empresa.idEndereco).subscribe((endereco) => {
      this.endereco = <Endereco>(endereco);
      console.log(endereco);
      this.formGroup.patchValue({
        'cep': endereco.cep,
        'uf': endereco.estado,
        'bairro': endereco.bairro,
        'cidade': endereco.cidade,
        'rua': endereco.rua,
        'numero': endereco.numero,
        'complemento': endereco.complemento,
      });
    })
  }

  salvar(){
    if(this.formGroup.invalid){
      return;
    }

    this.endereco.rua = this.formGroup.value.rua;
    this.endereco.bairro = this.formGroup.value.bairro;
    this.endereco.cidade = this.formGroup.value.cidade;
    this.endereco.complemento = this.formGroup.value.complemento;
    this.endereco.numero = this.formGroup.value.numero;
    this.endereco.estado = this.formGroup.value.uf;
    this.endereco.cep = this.formGroup.value.cep;;

    this.enderecoService.put(this.endereco).subscribe((response)=>{
      this.exibirMensagem("Alterado com sucesso!")
    }, (error)=>{
      this.exibirMensagem("Erro ao alterar!")
      console.log(error);
    })
  }

  ngOnInit() {
  }

  
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    }); 
    toast.present();
  }


} 
