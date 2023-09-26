import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({  
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroClientePage implements OnInit {

  formGroup: FormGroup;
  cliente: Cliente;
  constructor(private activatedRoute: ActivatedRoute, private clienteService: ClienteService, private fBuilder: FormBuilder, private toastController: ToastController, private navController: NavController) {
    this.cliente = new Cliente();
    this.formGroup = this.fBuilder.group(
      {
        'nmCliente': [this.cliente.nmCliente, Validators.compose([
          Validators.required,
        ])],
        'email': [this.cliente.email, Validators.compose([
          Validators.required,
          Validators.email
        ])],
        'senha': [this.cliente.senha, Validators.compose([
          Validators.required
        ])],
        'confirmarSenha': ['', Validators.compose([
          Validators.required
        ])],
      }
    );
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
  ngOnInit() {
  }
  
  async salvar() {
    try {
      this.cliente.nmCliente = this.formGroup.value.nmCliente;
      this.cliente.email = this.formGroup.value.email;
      this.cliente.senha = this.formGroup.value.senha;
        const response = await this.clienteService.post(this.cliente);
        this.exibirMensagem('Cadastro realizado com sucesso!');
        this.navController.navigateBack('/cliente/login');
    } catch (error: any) {
        if (error.status === 409) {
            this.exibirMensagem('Esse e-mail já foi cadastrado!');
            console.log(error)
        } else {
            console.error('Erro ao cadastrar:', error);
            this.exibirMensagem('Erro ao cadastrar!');
        }
    }
}

  isValid(): boolean {
    const passwordsMatch = this.checkPasswords();
    return this.formGroup.valid && !passwordsMatch;
  }
  
  
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
