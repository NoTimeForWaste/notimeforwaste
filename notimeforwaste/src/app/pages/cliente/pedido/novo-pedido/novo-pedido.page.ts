import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Endereco } from 'src/app/model/endereco';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';
import { HttpClient } from '@angular/common/http';
import { Pedido } from 'src/app/model/pedido';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { FormaEntrega } from 'src/app/model/forma-entrega';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.page.html',
  styleUrls: ['./novo-pedido.page.scss'],
})
export class NovoPedidoPage implements OnInit {


  enderecoSelecionado: Endereco | undefined;

  pacote: PacoteResponse;
  formasPagamento: FormaPagamento[];
  formasEntrega: FormaEntrega[];
  enderecos: Endereco[];
  pedido: Pedido;
  formGroup: FormGroup;
  constructor(protected utilsService: UtilsService, private clienteService: ClienteService, private navController: NavController, private activatedRoute: ActivatedRoute, private pacoteService: PacoteService, private formBuilder: FormBuilder, private pedidoService: PedidoService) {
    this.pacote = new PacoteResponse();
    this.formasPagamento = [];
    this.formasEntrega = [];
    this.enderecos = [];
    this.pedido = new Pedido();

    this.enderecoSelecionado = undefined;

    this.formGroup = this.formBuilder.group({
      observacao: [this.pedido.observacao, Validators.required],
      formaPagamento: [null, Validators.required],
      formaEntrega: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  isDelivery() {
    return this.formGroup.value.formaEntrega === 1;
  }
  async ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.params['idPacote'];
    if (id != null) {
      console.log(id)
      this.getPacote(parseInt(id));
      await this.carregarEnderecos();
    } else {
      this.navController.navigateBack("/cliente/home")
    }
  }

  getPacote(id: number) {
    this.pacoteService.getPacoteById(id).subscribe((pacote) => {
      this.pacote = <PacoteResponse>(pacote);
      this.pacote.formasPagamentos.forEach((formaPagamento) => {
        this.formasPagamento.push(formaPagamento);
      })
      this.pacote.formasEntregas.forEach((formaEntrega) => {
        this.formasEntrega.push(formaEntrega);
      })
      console.log(pacote);
    }, (error) => {
      console.log(error);

    });
  }

  async carregarEnderecos() {
    this.clienteService.getEnderecosByIdCliente(this.clienteService.getClienteLogado().idCliente).subscribe({
      next: (enderecos) => {
        this.enderecos = enderecos as Endereco[];
        console.log(this.enderecos);
      },
      error: (error) => {
        console.log(error);
        this.navController.navigateBack("/clients/pacotes")
      }
    });
  }

  back() {
    this.navController.navigateBack('/cliente/detalhes-pacote/' + this.pacote.idPacote);
  }

  enderecoToString(endereco: Endereco): string {
    return endereco.rua + " " + endereco.numero + ", " + endereco.bairro + ", " + endereco.cidade + " - " + endereco.estado;
  }

  selecionarEndereco(endereco: Endereco) {
    this.enderecoSelecionado = endereco;
  }

  deselecionarEndereco() {
    this.enderecoSelecionado = undefined;
  }

  isValid(): boolean {
    const enderecoValido = this.enderecoSelecionado !== undefined;

    return this.formGroup.valid;
  }

  salvar() {
    if (this.isValid()) {
      this.pedido.cancelado = false;
      this.pedido.idCliente = this.clienteService.getClienteLogado().idCliente;
      this.pedido.idFormaEntrega = this.formGroup.value.formaEntrega;
      if (this.pedido.idFormaEntrega == 1) {
        this.pedido.idEndereco = this.enderecoSelecionado!.idEndereco;
      } else {
        this.pedido.idEndereco = -1;
      }
      this.pedido.idPacote = this.pacote.idPacote;
      this.pedido.observacao = this.formGroup.value.observacao;
      this.pedido.idFormaPagamento = this.formGroup.value.formaPagamento;
      console.log(this.pedido);
      this.pedidoService.save(this.pedido).subscribe({
        next: async (res) => {
          console.log(res);
          await this.utilsService.MessageDisplaySuccess("Pedido realizado com sucesso!")
        },
        error: (error) => {
          console.log(error);
          this.utilsService.MessageDisplayError("Erro!"+error.message)
        }
      })
    }
    this.navController.navigateBack("/cliente/pedidos");
  }



}
