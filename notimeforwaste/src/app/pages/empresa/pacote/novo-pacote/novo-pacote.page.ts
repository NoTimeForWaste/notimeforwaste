import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { FormaEntrega } from 'src/app/model/forma-entrega';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Foto } from 'src/app/model/foto';
import { Pacote } from 'src/app/model/pacote';
import { PacoteFormaEntrega } from 'src/app/model/pacote-forma-entrega';
import { PacoteFormaPagamento } from 'src/app/model/pacote-forma-pagamento';
import { Produto } from 'src/app/model/produto';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';
import { FotoService } from 'src/app/services/foto.service';

interface IPacote {
  idPacote: number;
  nmPacote: string;
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

  produto: Produto = new Produto();
  formaPagamentoList: FormaPagamento[];
  formaEntregaList: FormaEntrega[];
  foto: Foto;
  empresa: Empresa;
  constructor(private activatedRoute: ActivatedRoute, private empresaService: EmpresaService, private fotoService: FotoService, private pacoteService: PacoteService, private fBuilder: FormBuilder, private toastController: ToastController, private navController: NavController) {
    this.formaPagamentoList = [];
    this.formaEntregaList = [];
    this.foto = new Foto();
    this.empresa = new Empresa();
  }

  inputs: IPacote = {
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
    this.empresa = this.empresaService.getEmpresa();
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
    if (forma.selecionado) {
      this.inputs.formasPagamento.push(forma);
    } else {
      const index = this.inputs.formasPagamento.findIndex(f => f.idFormaPagamento === forma.idFormaPagamento);
      if (index !== -1) {
        this.inputs.formasPagamento.splice(index, 1);
      }
    }
  }

  toggleFormaEntrega(forma: FormaEntrega) {
    if (forma.selecionado) {
      this.inputs.formasEntrega.push(forma);
    } else {
      const index = this.inputs.formasEntrega.findIndex(f => f.idFormaEntrega === forma.idFormaEntrega);
      if (index !== -1) {
        this.inputs.formasEntrega.splice(index, 1);
      }
    }
    console.log(this.inputs)
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  salvarProduto() {
    this.inputs.produtos.push(this.produto);
    console.log(this.inputs.produtos)
    this.produto = new Produto();
  }

  deletarProduto(index: number) {
    if (index < this.inputs.produtos.length && index >= 0) {
      this.inputs.produtos.splice(index, 1);
    }
  }

  openImagePicker(event: MouseEvent) {
    const inputElement = (event.currentTarget as HTMLElement).querySelector(
      'input'
    );
    inputElement?.click();
  }

  onImageSelected(event: any) {
    this.fotoService.setFotoDocument(event, this.foto);
  }

  isValid(): boolean {
    return this.inputs.formasEntrega.length > 0 && this.inputs.formasPagamento.length > 0 && this.inputs.nmPacote != '' && this.inputs.preco > 0 && this.inputs.produtos.length > 0 && this.foto.fotoUrl != '';
  }

  async salvar() {
    this.fotoService.post(this.foto.document!).subscribe(foto => {
      this.inputs.idFoto = foto.idFoto;
      console.log(foto);
      let pacote = new Pacote();
      pacote.idEmpresa = this.empresa.idEmpresa;
      pacote.nmPacote = this.inputs.nmPacote;
      pacote.idFoto = this.inputs.idFoto;
      pacote.preco = this.inputs.preco;
      console.log(pacote)
      this.pacoteService.postPacote(pacote).subscribe(pacote => {
        this.inputs.idPacote = pacote.idPacote;
        this.inputs.produtos.forEach(produtoResponse => {
          produtoResponse.idPacote = this.inputs.idPacote;
          this.pacoteService.postProduto(produtoResponse).subscribe(res => {
            console.log(res)
          } , error => {
            console.log(error);
          });
        });
        // this.inputs.formasEntrega.forEach(formaEntrega => {
        //   let pacoteFormaEntrega = new PacoteFormaEntrega();
        //   pacoteFormaEntrega.idFormaEntrega = formaEntrega.idFormaEntrega;
        //   pacoteFormaEntrega.idPacote = this.inputs.idPacote;
        //   this.pacoteService.postFormaEntrega(pacoteFormaEntrega).subscribe(res => {
        //     console.log(res)
        //   } , error => {
        //     console.log(error);
        //   });
        // });
        // this.inputs.formasPagamento.forEach(formaPagamento => {
        //   let pacoteFormaPagamento = new PacoteFormaPagamento();
        //   pacoteFormaPagamento.idFormaPagamento = formaPagamento.idFormaPagamento;
        //   pacoteFormaPagamento.idPacote = this.inputs.idPacote;
        //   this.pacoteService.postFormaPagamento(pacoteFormaPagamento).subscribe(res => {
        //     console.log(res)
        //   } , error => {
        //     console.log(error);
        //   });
        // });

        this.exibirMensagem("Pacote salvo com sucesso!");
      }, error => {
        this.exibirMensagem("Erro ao salvar pacote.")
      });
  
    }, error => {
      this.exibirMensagem("Erro ao tentar salvar foto! Pacote não salvo.")
    });
  }
}

