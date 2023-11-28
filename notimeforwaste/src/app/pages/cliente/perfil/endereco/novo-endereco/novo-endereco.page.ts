import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { debounceTime } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { Endereco } from 'src/app/model/endereco';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IClienteEndereco } from 'src/app/types/IClienteEndereco';
import { IEndereco } from 'src/app/types/IEndereco';

@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.page.html',
  styleUrls: ['./novo-endereco.page.scss'],
})
export class NovoEnderecoPage implements OnInit {


  endereco: Endereco;
  formGroup: FormGroup;
  cliente: Cliente;

  constructor(private clienteService: ClienteService, private navController: NavController, private enderecoService: EnderecoService, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, protected utilsService: UtilsService) {
    this.endereco = new Endereco();
    this.cliente = new Cliente();
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
        'complemento': [this.endereco.complemento],
        'cidade': [this.endereco.cidade, Validators.compose([
          Validators.required
        ])],
        'apelido': [this.endereco.apelido],
      }
    );
    let id = this.activatedRoute.snapshot.params['idEndereco'];
    const cep = this.formGroup.get('cep')?.value;
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

  isValid(): boolean {
    let cep = this.formGroup.value.cep;
    let uf = this.formGroup.value.uf;
    let cidade = this.formGroup.value.cidade;
    let bairro = this.formGroup.value.bairro;
    let rua = this.formGroup.value.rua;
    let complemento = this.formGroup.value.complemento;
    let numero = this.formGroup.value.numero;
    let apelido = this.formGroup.value.apelido;
    if (cep != '' && uf != '' && cidade != '' && bairro != '' && rua != '' && complemento != '' && numero != '' && apelido != '') {
      this.endereco.cep = cep;
      this.endereco.estado = uf;
      this.endereco.cidade = cidade;
      this.endereco.bairro = bairro;
      this.endereco.rua = rua;
      this.endereco.numero = numero;
      this.endereco.apelido = apelido;
      this.endereco.complemento = complemento
      return true;
    }
    return false;
  }

  salvar() {
    if (this.endereco.idEndereco === 0) {
      this.enderecoService.post(this.endereco).subscribe({
        next: (endereco) => {
          this.endereco = <Endereco>(endereco);
          const clienteEndereco: IClienteEndereco = {
            idCliente: this.cliente.idCliente,
            idEndereco: this.endereco.idEndereco,
          }

          this.clienteService.postClienteEndereco(clienteEndereco).subscribe({
            next: (res) => {
              this.utilsService.messageDisplaySuccess("Endereço salvo com sucesso!")
              this.navController.navigateBack("/cliente/endereco")
            },
            error: (error) => {
              console.log(error);
              this.utilsService.messageDisplayError("Erro ao salvar endereço!");
            }
          })
        },
        error: (error) => {
          console.log(error);
          this.utilsService.messageDisplayError("Erro ao salvar endereço!");
        }
      })
    }
  }

  ngOnInit() {
    this.cliente = this.clienteService.getClienteLogado();
  }

}
