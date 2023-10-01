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
    if (this.formGroup.valid) {
      const email = this.formGroup.value.email;
      this.clienteService.existsByEmail(email).subscribe((emailJaCadastrado) => {
        if (emailJaCadastrado > 0) {
          this.exibirMensagem('E-mail já cadastrado. Por favor, escolha outro e-mail.');
        } else {
          const novoCliente = this.formGroup.value;
          this.clienteService.post(novoCliente).subscribe(
            (clienteCadastrado) => {
              console.log(clienteCadastrado);
              this.exibirMensagem('Cadastro realizado com sucesso!');
              this.navController.navigateBack('/cliente/login');
            },
            (error) => {
              console.error('Erro ao cadastrar cliente:', error);
              this.exibirMensagem('Erro ao cadastrar!');
            }
          );
        }
      });
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
