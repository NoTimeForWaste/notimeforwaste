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
  email?: string;
  senha?: string;
  formGroup: FormGroup;
  cliente: Cliente;
  isTextFieldType: boolean;

  constructor(private clienteService: ClienteService, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.cliente = new Cliente();
    this.isTextFieldType = false;
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

  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  async logar() {

    if (this.formGroup.valid) {
      const email = this.formGroup.value.email;
      const senha = this.formGroup.value.senha;
      this.clienteService.existsByEmail(email).subscribe((res) => {
        if (res <= 0) {
          this.exibirMensagem('E-mail inválido.')
        } else {
          this.clienteService.login(email, senha).subscribe(
            (response) => {
              if (response.status === 200) {
                console.log('Login bem-sucedido!', response);
                this.cliente = <Cliente>(response.body);
                this.clienteService.setClienteLogado(this.cliente);
                this.navController.navigateBack('/cliente/home');
              } else {
                this.exibirMensagem('Senha inválida.')
              }
            },
            (error) => {
              console.error('Erro ao fazer login:', error);
              this.exibirMensagem("Erro ao fazer login.")
            }
          );
        }
      });
    }
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
