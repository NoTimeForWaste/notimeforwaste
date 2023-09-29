import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email?: String;
  senha?: String;
  formGroup: FormGroup;
  empresa: Empresa;
  

  constructor(private empresaService: EmpresaService, private fBuilder: FormBuilder, private toastController: ToastController, private navController: NavController) {
    this.empresa = new Empresa();
    this.formGroup = this.fBuilder.group(
      {
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

  async salvar() {
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;
    this.empresaService.login(this.email!, this.senha!).then((response: any) => {
      if (response.status === 200) {
        this.empresa = <Empresa>(response.body);
        localStorage.setItem('Empresa', JSON.stringify(this.empresa));
        this.empresaService.setEmpresa(this.empresa); 
        this.navController.navigateBack('/empresa/home');
        console.log(this.empresa)
      } else if (response.status === 404) {
        // E-mail inválido
        this.exibirMensagem(response.error);
      } else if (response.status === 409) {
        // Senha inválida
        this.exibirMensagem(response.error);
      }
    }).catch((erro) => {
      this.exibirMensagem("Erro ao logar!");
    });
  }
   

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  ngOnInit() {
  }

}
