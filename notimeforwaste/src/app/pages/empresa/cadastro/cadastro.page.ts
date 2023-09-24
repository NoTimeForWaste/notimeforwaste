import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController, AlertController, ModalController } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Empresa } from 'src/app/model/empresa';
import { Endereco } from 'src/app/model/endereco';
import { HorarioFuncionamento } from 'src/app/model/horario-funcionamento';
import { tick } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, debounceTime, switchMap, throwError } from 'rxjs';
import { FotoService } from 'src/app/services/foto.service';
import { Foto } from 'src/app/model/foto';
import { ValidatorsService } from 'src/app/services/validators.service';
import { Time } from '@angular/common';
import { EnderecoService } from 'src/app/services/endereco.service';

interface IEndereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  step: number;
  formGroup: FormGroup;
  empresa: Empresa;
  endereco: Endereco;
  horarioSegASex: HorarioFuncionamento;
  horarioSabado: HorarioFuncionamento;
  horarioDomingo: HorarioFuncionamento;
  foto: Foto;
  horarios: HorarioFuncionamento[];

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private enderecoService: EnderecoService, private validatorsService: ValidatorsService, private fotoService: FotoService, private http: HttpClient, private empresaService: EmpresaService, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.foto = new Foto();
    this.step = 1;
    this.empresa = new Empresa();
    this.endereco = new Endereco();
    this.horarioDomingo = new HorarioFuncionamento();
    this.horarioSabado = new HorarioFuncionamento();
    this.horarioSegASex = new HorarioFuncionamento();
    this.horarios = [];

    this.formGroup = this.fBuilder.group(
      {
        'nmEmpresa': [this.empresa.nmEmpresa, Validators.compose([
          Validators.required,
        ])],
        'cnpj': [this.empresa.cnpj, Validators.compose([
          Validators.required
        ])],
        'telefone': [this.empresa.telefone, Validators.compose([
          Validators.required
        ])],
        'cep': [this.endereco.cep, Validators.compose([
          Validators.required
        ])],
        'uf': [this.endereco.estado, Validators.compose([
          Validators.required
        ])],
        'bairro': [this.endereco.bairro, Validators.compose([
          Validators.required
        ])],
        'cidade': [this.endereco.cidade, Validators.compose([
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
        'hrSegASexI': [this.horarioSegASex.horarioInicial, Validators.compose([
          Validators.required
        ])],
        'hrSegASexF': [this.horarioSegASex.horarioFinal, Validators.compose([
          Validators.required
        ])],
        'hrSabadoI': [this.horarioSabado.horarioInicial, Validators.compose([
          Validators.required
        ])],
        'hrSabadoF': [this.horarioSabado.horarioFinal, Validators.compose([
          Validators.required
        ])],
        'hrDomingoI': [this.horarioDomingo.horarioInicial, Validators.compose([
          Validators.required
        ])],
        'hrDomingoF': [this.horarioDomingo.horarioFinal, Validators.compose([
          Validators.required
        ])],
        'email': [this.empresa.email, Validators.compose([
          Validators.required,
        ])],
        'senha': ['', Validators.compose([Validators.required])],
        'confirmarSenha': ['', Validators.compose([Validators.required])],
      }
    );

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

  checkPasswords() {
    let passControl = this.formGroup.get('senha');
    let confirmPassControl = this.formGroup.get('confirmarSenha');
    if (passControl?.value === '' || confirmPassControl?.value === '') {
      return null;
    }

    if (passControl && confirmPassControl) {
      let pass = passControl.value;
      let confirmPass = confirmPassControl.value;

      return pass === confirmPass ? null : { notSame: true }
    }

    return { notSame: true };
  }

  isStep1Valid(): boolean {
    let nmEmpresa = this.formGroup.value.nmEmpresa;
    let cnpj = this.formGroup.value.cnpj;
    let telefone = this.formGroup.value.telefone;
    cnpj = cnpj.replace(/\D/g, '');
    if (this.validatorsService.validCNPJ(cnpj) && nmEmpresa != '' && this.formGroup.value.telefone != '') {
      this.empresa.nmEmpresa = nmEmpresa;
      this.empresa.cnpj = cnpj;
      this.empresa.telefone = telefone;
      return true;
    }
    return false;
  }

  isStep2Valid(): boolean {
    let cep = this.formGroup.value.cep;
    let uf = this.formGroup.value.uf;
    let cidade = this.formGroup.value.cidade;
    let bairro = this.formGroup.value.bairro;
    let rua = this.formGroup.value.rua;
    let complemento = this.formGroup.value.complemento;
    let numero = this.formGroup.value.numero;
    let apelido = this.empresa.nmEmpresa;
    if (cep != '' && uf != '' && cidade != '' && bairro != '' && rua != '' && complemento != '' && numero != '') {
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

  isStep3Valid(): boolean {
    const hrSegASexI = this.formGroup.value.hrSegASexI;
    const hrSegASexF = this.formGroup.value.hrSegASexF;
    const hrSabadoI = this.formGroup.value.hrSabadoI;
    const hrSabadoF = this.formGroup.value.hrSabadoF;
    const hrDomingoI = this.formGroup.value.hrDomingoI;
    const hrDomingoF = this.formGroup.value.hrDomingoF;

    if (
      this.horarioEValido(hrSegASexI, hrSegASexF) ||
      this.horarioEValido(hrSabadoI, hrSabadoF) ||
      this.horarioEValido(hrDomingoI, hrDomingoF)
    ) {
      this.horarioSegASex.horarioInicial = hrSegASexI;
      this.horarioSegASex.horarioFinal = hrSegASexF;
      this.horarioSabado.horarioInicial = hrSabadoI;
      this.horarioSabado.horarioFinal = hrSabadoF;
      this.horarioDomingo.horarioInicial = hrDomingoI;
      this.horarioDomingo.horarioFinal = hrDomingoF;

      this.horarios.push(this.horarioDomingo);
      this.horarios.push(this.horarioSabado);
      this.horarios.push(this.horarioSegASex);
      return true;
    }

    return false;
  }

  horarioEValido(horarioInicial: string, horarioFinal: string): boolean {
    return horarioInicial <= horarioFinal;
  }


  isStep4Valid(): boolean {
    if (this.foto.fotoUrl != '' && this.formGroup.valid && this.checkPasswords() === null) {
      return true;
    }
    return false;
  }

  ngOnInit() {
  }

  nextStep() {
    this.step++;
  }

  backStep() {
    if (this.step === 1) {
      this.navController.navigateBack('/empresa/login');
    } else {
      this.step--;
    }
  }

  async salvar() {
    this.enderecoService.post(this.endereco).subscribe(
      response => {
        console.log('Resposta da API:', response);
        this.endereco = response as Endereco;
        this.empresa.idEndereco = this.endereco.idEndereco;
        if (this.foto.document) {
          this.fotoService.post(this.foto.document).subscribe(
            json => {
              this.foto = json as Foto;
              this.empresa.idFoto = this.foto.idFoto;
              console.log('Resposta da API:', json);
              this.empresa.senha = this.formGroup.value.senha;
              this.empresa.email = this.formGroup.value.email;;
              this.empresaService.post(this.empresa).subscribe(
                empresa => {
                  // Lide com a resposta da API aqui
                  console.log('Resposta da API:', empresa);
                },
                error => {
                  // Lide com erros aqui
                  this.exibirMensagem('Erro ao cadastrar a empresa!')
                  console.error('Erro:', error);
                }
              );
            },
            error => {
              this.exibirMensagem('Erro ao cadastrar a empresa!')
              console.error('Erro:', error);
              return
            }

          );
        }
      },
      error => {
        this.exibirMensagem('Erro ao cadastrar a empresa!')
        console.error('Erro:', error);
        return
      }
    );

    this.exibirMensagem('Cadastro realizado com sucesso!');
    this.navController.navigateBack("empresa/login")
  }




  openImagePicker(event: MouseEvent) {
    const inputElement = (event.currentTarget as HTMLElement).querySelector(
      'input'
    );
    inputElement?.click();
  }

  onImageSelected(event: any) {
    this.fotoService.setFotoDocument(event, this.foto);
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}