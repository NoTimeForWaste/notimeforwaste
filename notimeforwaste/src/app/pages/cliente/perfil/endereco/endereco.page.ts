import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Endereco } from 'src/app/model/endereco';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {

  enderecos: Endereco[];
  constructor(protected utilsService: UtilsService, private loadingController: LoadingController, private clienteService: ClienteService, private toastController: ToastController) {
    this.enderecos = [];
  }

  ngOnInit() {

  }

  async carregarEnderecos() {
    this.clienteService.getEnderecosByIdCliente(this.clienteService.getClienteLogado().idCliente).subscribe({
      next: (enderecos) => {
        this.enderecos = enderecos as Endereco[];
        console.log(this.enderecos)
      },
      error: (error) => {
        console.log(error);
        this.exibirMensagem("Erro ao carregar endereços")
      }
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    await this.carregarEnderecos();
  }

}
