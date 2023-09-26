import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.page.html',
  styleUrls: ['./login-cliente.page.scss'],
})
export class LoginClientePage implements OnInit {
  email?: String;
  senha?: String;
  formGroup: FormGroup;
  cliente:  Cliente;
  

  constructor(private clienteService: ClienteService, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.cliente = new Cliente();
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
    this.clienteService.login(this.email!, this.senha!).then((response: any) => {
      if (response.status === 200) {
        this.cliente = <Cliente>(response.body)
        this.clienteService.setCliente(this.cliente); 
        this.navController.navigateBack('/cliente/home');
        console.log(this.cliente)
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
  