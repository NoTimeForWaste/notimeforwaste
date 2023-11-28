import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {
  email?: String;
  senha?: String;
  nome?: String;
  formGroup: FormGroup;
  cliente: Cliente;

  constructor(protected utilsService: UtilsService, private fBuilder: FormBuilder, private clienteService: ClienteService, private toastController: ToastController ) { 
    this.cliente =  this.clienteService.getClienteLogado();
    this.formGroup = this.fBuilder.group(
      {
        'nome': [this.cliente.nmCliente, Validators.compose([
          Validators.required])],
        'email': [this.cliente.email, Validators.compose([
          Validators.required,
        ])],
        'senha': [this.cliente.senha, Validators.compose([
          Validators.required
        ])],

      }
    );
  }

  ngOnInit() {
   
  }


  salvar(){
    if(this.formGroup.invalid){
      return;
    }
    this.cliente.nmCliente = this.formGroup.value.nome;
    this.cliente.senha = this.formGroup.value.senha;
    this.clienteService.put(this.cliente).subscribe({
      next: (cliente) => {
        this.cliente = <Cliente>(cliente);
        this.clienteService.setClienteLogado(this.cliente);
        this.utilsService.messageDisplaySuccess("Alterado com sucesso");
      },
      error: (error) => {
        console.log(error)
        this.utilsService.messageDisplayError("Erro ao alterar;")
      }
    })
  }

  

  
  
  isInvalid(): boolean {
    return this.cliente.nmCliente === this.formGroup.value.nome && this.cliente.senha === this.formGroup.value.senha;
  }
  
}
