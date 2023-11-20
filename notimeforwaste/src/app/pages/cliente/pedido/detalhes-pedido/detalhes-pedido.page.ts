import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PedidoResponse } from 'src/app/model/response/pedido-response';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.page.html',
  styleUrls: ['./detalhes-pedido.page.scss'],
})
export class DetalhesPedidoPage implements OnInit {
  pedido: PedidoResponse;
  parseInt = parseInt;

  constructor(protected utilsService: UtilsService, private clienteService: ClienteService, private navController: NavController, private activatedRoute: ActivatedRoute, private pacoteService: PacoteService, private formBuilder: FormBuilder, private pedidoService: PedidoService) {
    this.pedido = new PedidoResponse();
  }

  ngOnInit() {
    this.pedido.idPedido = this.activatedRoute.snapshot.params['idPedido'];
    this.getPedido();

  }

  async getPedido() {
    this.pedidoService.getById(this.pedido.idPedido).subscribe({
      next: (res) => {
        console.log(res)
        this.pedido = res as PedidoResponse;
        console.log(this.pedido)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  cancelar() {
    this.pedidoService.cancel(this.pedido.idPedido).subscribe({
      next: (res) => {
        this.utilsService.MessageDisplaySuccess("Pedido cancelado com sucesso!")
        this.pedido.cancelado = true;
      },
      error: (error) => {
        this.utilsService.MessageDisplayError("Erro ao cancelar pedido!")
        console.log(error);
      }
    })
  }

  confirm() {
    this.pedidoService.updateStatus(this.pedido.idPedido, 4).subscribe({
      next: (res) => {
        this.utilsService.MessageDisplaySuccess("Pedido confirmado com sucesso!");
        this.pedido.status = 4;
      },
      error: (error) => {
        this.utilsService.MessageDisplayError("Erro ao confirmar pedido!")
        console.log(error);
      }
    })
  }

  canCancel(): boolean{
    return !this.pedido.cancelado && this.pedido.status < 2;
  }

  canConfirm(): boolean{
    return !this.pedido.cancelado && this.pedido.status == 3;
  }


  getProgressBarClass(status: number): string {
    switch (status) {
      case 0:
        return 'active-0';
      case 1:
        return 'active-1';
      case 2:
        return 'active-2';
      case 3:
        return 'active-3';
      case 4:
        return 'active-4';
      default:
        return '';
    }
  }
}
