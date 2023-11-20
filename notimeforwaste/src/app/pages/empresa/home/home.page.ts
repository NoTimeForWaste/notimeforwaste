import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PedidoResponse } from 'src/app/model/response/pedido-response';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pedidos: PedidoResponse[];
  constructor(protected utilsService: UtilsService, private empresaService: EmpresaService, private loadingController: LoadingController, private pedidoService: PedidoService) {
    this.pedidos = [];
  }

  ngOnInit() {

  }

  async carregarPedidos() {
    this.pedidoService.getByEmpresaId(this.empresaService.getEmpresaLogada().idEmpresa).subscribe({
      next: (res) => {
        console.log(res)
        this.pedidos = (res as PedidoResponse[]).filter(pedido => pedido.status === 0 && pedido.cancelado === false);
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

  aceitar(idPedido: number) {
    this.pedidoService.updateStatus(idPedido, 1).subscribe({
      next: (res) => {
        this.utilsService.MessageDisplaySuccess("Pedido confirmado com sucesso!");
        this.carregarLista();
      },
      error: (error) => {
        this.utilsService.MessageDisplayError("Erro ao confirmar pedido!")
        console.log(error);
      }
    })
  }

  cancelar(idPedido: number) {
    this.pedidoService.cancel(idPedido).subscribe({
      next: (res) => {
        this.utilsService.MessageDisplaySuccess("Pedido cancelado com sucesso!");
        this.carregarLista();
      },
      error: (error) => {
        this.utilsService.MessageDisplayError("Erro ao cancelar pedido!")
        console.log(error);
      }
    })
  }
}   
