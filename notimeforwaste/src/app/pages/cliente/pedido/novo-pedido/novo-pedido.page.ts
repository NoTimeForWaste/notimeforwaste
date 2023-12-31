import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
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
import { EnderecoBottomSheetPage } from 'src/app/endereco-bottom-sheet/endereco-bottom-sheet.page';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.page.html',
  styleUrls: ['./novo-pedido.page.scss'],
})
export class NovoPedidoPage implements OnInit {


  enderecoSelecionado: Endereco | undefined;
  loading: boolean = false;
  pacote: PacoteResponse;
  formasPagamento: FormaPagamento[];
  formasEntrega: FormaEntrega[];
  enderecos: Endereco[];
  pedido: Pedido;
  formGroup: FormGroup;
  constructor(private modalCtrl: ModalController, protected utilsService: UtilsService, private clienteService: ClienteService, private navController: NavController, private activatedRoute: ActivatedRoute, private pacoteService: PacoteService, private formBuilder: FormBuilder, private pedidoService: PedidoService) {
    this.pacote = new PacoteResponse();
    this.formasPagamento = [];
    this.formasEntrega = [];
    this.enderecos = [];
    this.pedido = new Pedido();

    this.enderecoSelecionado = undefined;

    this.formGroup = this.formBuilder.group({
      observacao: [this.pedido.observacao],
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

  selecionarEndereco(endereco: Endereco) {
    this.enderecoSelecionado = endereco;
    console.log(this.enderecoSelecionado);
  }

  deselecionarEndereco() {
    this.enderecoSelecionado = undefined;
  }

  isValid(): boolean {
    if (this.formGroup.value.formaEntrega === 1) {
      if (this.enderecoSelecionado?.idEndereco! === undefined) {
        return false;
      }
    }
    return this.formGroup.valid && !this.loading;
  }

  salvar() {
    if (this.isValid()) {
      console.log(this.formGroup.value.formaEntrega);
      this.loading = true;
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
          await this.utilsService.messageDisplaySuccess("Pedido realizado com sucesso!")
        },
        error: (error) => {
          console.log(error);
          this.utilsService.messageDisplayError("Erro!" + error.message)
        }
      })
    }
    this.navController.navigateBack("/cliente/pedidos");
  }


  async newEndereco() {
    const modal = await this.modalCtrl.create({
      component: EnderecoBottomSheetPage,
      breakpoints: [0, 0.6, 0.7, 0.8],
      initialBreakpoint: 0.8
    });
    await modal.present();
    this.carregarEnderecos();
  }

}
