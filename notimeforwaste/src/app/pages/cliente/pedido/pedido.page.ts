import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { PedidoResponse } from 'src/app/model/response/pedido-response';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  pedidos: PedidoResponse[];
  constructor(protected utilsService: UtilsService, private clienteService: ClienteService, private loadingController: LoadingController, private pedidoService: PedidoService) {
    this.pedidos = [];
  }



  ngOnInit() {

  }

  async carregarPedidos() {
    this.pedidoService.getByClienteId(this.clienteService.getClienteLogado().idCliente).subscribe({
      next: (res) => {
        console.log(res)
        this.pedidos = res as PedidoResponse[];
        console.log(this.pedidos)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();
    await this.carregarPedidos();
    this.fecharLoader();
  }


  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  cancelar(idPedido: number){
    this.pedidoService.cancel(idPedido).subscribe({
      next: (res) =>{
        this.utilsService.messageDisplaySuccess("Pedido cancelado com sucesso!")
        this.carregarLista();
      },
      error: (error) =>{
        this.utilsService.messageDisplayError("Erro ao cancelar pedido!")
        console.log(error);
      }
    })
  }

  confirm(idPedido: number) {
    this.pedidoService.updateStatus(idPedido, 4).subscribe({
      next: (res) => {
        this.utilsService.messageDisplaySuccess("Pedido confirmado com sucesso!");
        this.carregarLista();
      },
      error: (error) => {
        this.utilsService.messageDisplayError("Erro ao confirmar pedido!")
        console.log(error);
      }
    })
  }

  canCancel(pedido: PedidoResponse): boolean{
    return !pedido.cancelado && pedido.status < 2;
  }

  canConfirm(pedido: PedidoResponse): boolean{
    return !pedido.cancelado && pedido.status == 3;
  }
}
  