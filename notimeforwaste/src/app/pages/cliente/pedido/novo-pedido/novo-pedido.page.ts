import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Endereco } from 'src/app/model/endereco';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.page.html',
  styleUrls: ['./novo-pedido.page.scss'],
})
export class NovoPedidoPage implements OnInit {

  pacote: PacoteResponse;
  formasPagamento: FormaPagamento[];
  enderecos: Endereco[];
  constructor(private clienteService: ClienteService, private navController: NavController, private activatedRoute: ActivatedRoute, private pacoteService: PacoteService) {
    this.pacote = new PacoteResponse();
    this.formasPagamento = [];
    this.enderecos = [];
  }

  ngOnInit() {

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
      console.log(this.formasPagamento);
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
}
