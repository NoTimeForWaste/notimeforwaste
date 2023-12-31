import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PedidoResponse } from 'src/app/model/response/pedido-response';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  filterSelected: number = -1;
  onFilters: boolean = true;
  pedidos: PedidoResponse[];
  allPedidos: PedidoResponse[];
  constructor(protected utilsService: UtilsService, private empresaService: EmpresaService, private loadingController: LoadingController, private pedidoService: PedidoService) {
    this.pedidos = [];
    this.allPedidos = [];
  }

  ngOnInit() {

  }

  async carregarPedidos() {
    this.pedidoService.getByEmpresaId(this.empresaService.getEmpresaLogada().idEmpresa).subscribe({
      next: (res) => {
        console.log(res)
        this.allPedidos = res as PedidoResponse[];
        this.pedidos = this.allPedidos;
        console.log(this.pedidos)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async getPedidosCancelados() {
    this.filterSelected = 3;
    this.pedidos = this.allPedidos.filter(pedido => pedido.cancelado === true);
  }

  async getByPendentes() {
    this.filterSelected = 0;
    this.pedidos = this.allPedidos.filter(pedido => (pedido.status === 0 || pedido.status === 1) && pedido.cancelado === false);
    console.log(this.pedidos)
  }

  async getByACaminho() {
    this.filterSelected = 1;
    this.pedidos = this.allPedidos.filter(pedido => pedido.status === 2 && pedido.cancelado === false);
  }

  async getByEntregues() {
    this.filterSelected = 2;
    this.pedidos = this.allPedidos.filter(pedido => pedido.status === 3 || pedido.status === 4 && pedido.cancelado === false);
  }

  getTitle(): string{
    return this.filterSelected === -1 ? "Todos" : this.filterSelected === 0 ? "Pendentes" :  this.filterSelected === 1 ? "Á Caminho" :  this.filterSelected === 2 ? "Entregues" :  "Cancelados";
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
        this.utilsService.messageDisplaySuccess("Pedido confirmado com sucesso!");
        this.carregarLista();
      },
      error: (error) => {
        this.utilsService.messageDisplayError("Erro ao confirmar pedido!")
        console.log(error);
      }
    })
  }

  cancelar(idPedido: number) {
    this.pedidoService.cancel(idPedido).subscribe({
      next: (res) => {
        this.utilsService.messageDisplaySuccess("Pedido cancelado com sucesso!");
        this.carregarLista();
      },
      error: (error) => {
        this.utilsService.messageDisplayError("Erro ao cancelar pedido!")
        console.log(error);
      }
    })
  }

  canCancel(pedido: PedidoResponse): boolean{
    return !pedido.cancelado && pedido.status < 2;
  }

  canAccept(pedido: PedidoResponse): boolean{
    return !pedido.cancelado && pedido.status == 0;
  
  }
  showFilters() {
    this.onFilters = !this.onFilters;
    console.log(this.onFilters)
  } 

}
