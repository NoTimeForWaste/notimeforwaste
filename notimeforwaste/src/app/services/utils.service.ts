import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Endereco } from '../model/endereco';
import { PedidoResponse } from '../model/response/pedido-response';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController: ToastController) { }

  async messageDisplaySuccess(texto: string) {
    const toast = await this.toastController.create({
      color: 'success',
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async messageDisplayAlert(texto: string) {
    const toast = await this.toastController.create({
      color: 'warning',
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async messageDisplayError(texto: string) {
    const toast = await this.toastController.create({
      color: 'danger',
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  priceToString(valor: number): string {
    const valorFormatado = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return valorFormatado;
  }

  enderecoToString(endereco: Endereco): string {
    let str = endereco.rua + " " + endereco.numero + ", " + endereco.bairro + ", " + endereco.cidade + " - " + endereco.estado;
    return (str.length > 35) ? str.slice(0, 35) + "..." : str;
  }
  
  getPedidoEndereco(pedido: PedidoResponse): string{
    return pedido.endereco != null ? this.enderecoToString(pedido.endereco) : "Retirada";
  }

  getPedidoFormaPagamento(pedido: PedidoResponse){
    const formaPagamento = pedido.pacote.formasPagamentos.find(formaPagamento => formaPagamento.idFormaPagamento === pedido.idFomPagamento);
    return formaPagamento?.nome;
  }
}
