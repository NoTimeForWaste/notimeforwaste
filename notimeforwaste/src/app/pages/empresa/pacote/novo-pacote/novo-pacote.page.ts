import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { FormaEntrega } from 'src/app/model/forma-entrega';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Produto } from 'src/app/model/produto';
import { PacoteService } from 'src/app/services/empresa/pacote.service';

interface Pacote {
  idPacote: number;
  nmPacote: String;
  preco: number;
  idEmpresa: number;
  idFoto: number;
  produtos: Produto[];
  formasEntrega: FormaEntrega[];
  formasPagamento: FormaPagamento[];
}

@Component({
  selector: 'app-novo-pacote',
  templateUrl: './novo-pacote.page.html',
  styleUrls: ['./novo-pacote.page.scss'],
})
export class NovoPacotePage implements OnInit {

  formaPagamentoList: FormaPagamento[];
  formaEntregaList: FormaEntrega[];
  constructor(private activatedRoute: ActivatedRoute, private pacoteService: PacoteService, private fBuilder: FormBuilder, private toastController: ToastController, private navController: NavController) {
    this.formaPagamentoList = [];
    this.formaEntregaList = [];
  }

  inputs: Pacote = {
    idPacote: 0,
    nmPacote: '',
    preco: 0,
    idEmpresa: 0,
    idFoto: 0,
    produtos: [],
    formasEntrega: [],
    formasPagamento: [],
  };

  ngOnInit() {
    this.pacoteService.getAllFormasPagamento().subscribe((data: any) => {
      this.formaPagamentoList = data as FormaPagamento[];
    }, error => {
      this.exibirMensagem("Erro desconhecido! Lamentamos")
      this.navController.navigateBack("/empresa/pacotes")
    });

    this.pacoteService.getAllFormasEntrega().subscribe((data: any) => {
      this.formaEntregaList = data as FormaEntrega[];
    }, error => {
      this.exibirMensagem("Erro desconhecido! Lamentamos")
      this.navController.navigateBack("/empresa/pacotes")

    });
  }

  toggleFormaPagamento(forma: FormaPagamento) {
    forma.selecionado = !forma.selecionado;
    if (forma.selecionado) {
      this.inputs.formasPagamento.push(forma);
    } else {
      const index = this.inputs.formasPagamento.indexOf(forma);
      if (index !== -1) {
        this.inputs.formasPagamento.splice(index, 1);
      }
    }
  }

  // Função para adicionar ou remover forma de entrega
  toggleFormaEntrega(forma: FormaEntrega) {
    forma.selecionado = !forma.selecionado;
    if (forma.selecionado) {
      this.inputs.formasEntrega.push(forma);
    } else {
      const index = this.inputs.formasEntrega.indexOf(forma);
      if (index !== -1) {
        this.inputs.formasEntrega.splice(index, 1);
      }
    }
  }

  
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }


}
