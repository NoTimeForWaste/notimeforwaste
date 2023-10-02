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
  email?: string;
  senha?: string;
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

  async logar() {
    this.email = this.formGroup.value.email;
    this.senha = this.formGroup.value.senha;
    this.empresaService.existsByEmail(this.email!).subscribe((exists) => {
      if (exists <= 0) {
        this.exibirMensagem("Email inválido.");
        return;
      }
      this.empresaService.login(this.email!, this.senha!).subscribe((response) => {
        if (response.status === 200) {
          this.empresa = <Empresa>(response.body);
          this.empresaService.setEmpresaLogada(this.empresa);
          this.navController.navigateBack('/empresa/home');
          console.log(this.empresa)
        } else if (response.status === 409) {
          this.exibirMensagem("Senha inválida.");
        }
      }, (error) => {
        this.exibirMensagem("Erro ao logar!");
        console.log("Erro ao logar: " + error)
      })
    })

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
