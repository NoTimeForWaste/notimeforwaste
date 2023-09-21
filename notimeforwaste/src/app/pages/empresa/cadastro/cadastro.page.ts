import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Empresa } from 'src/app/model/empresa';
import { Endereco } from 'src/app/model/endereco';
import { HorarioFuncionamento } from 'src/app/model/horario-funcionamento';
import { tick } from '@angular/core/testing';


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
  constructor(private empresaService: EmpresaService, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.step =  1;
    this.empresa = new Empresa();
    this.endereco = new Endereco();
    this.horarioDomingo = new HorarioFuncionamento();
    this.horarioSabado = new HorarioFuncionamento();
    this.horarioSegASex = new HorarioFuncionamento();

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
        'hrSegASexI': ['', Validators.compose([
          Validators.required
        ])],
        'hrSegASexF': ['', Validators.compose([
          Validators.required
        ])],
        'hrSabadoI': ['', Validators.compose([
          Validators.required
        ])],
        'hrSabadoF': ['', Validators.compose([
          Validators.required
        ])],
        'hrDomingoI': ['', Validators.compose([
          Validators.required
        ])],
        'hrDomingoF': ['', Validators.compose([
          Validators.required
        ])],
        'email': [this.empresa.email, Validators.compose([
          Validators.required,
        ])],
        'senha': ['', Validators.compose([
          Validators.required,
        ])],
        'confirmarSenha': ['', Validators.compose([
          Validators.required,
        ])],
      }
    );
   }

  ngOnInit() {
  }

  nextStep(){
    this.step++;
  }

  backStep(){
    if(this.step === 1){
      this.navController.navigateBack('/tela-inicial');
    }else{
      this.step--;
    }
  }

  salvar(){

  }    
}
