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
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';
import { FotoService } from 'src/app/services/foto.service';
import { UtilsService } from 'src/app/services/utils.service';

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
  pacoteExistente: PacoteResponse;
  produtosToDelete: Produto[];
  constructor(private activatedRoute: ActivatedRoute, private empresaService: EmpresaService, private fotoService: FotoService, private pacoteService: PacoteService, private fBuilder: FormBuilder, private utilsService: UtilsService, private navController: NavController) {
    this.formaPagamentoList = [];
    this.formaEntregaList = [];
    this.foto = new Foto();
    this.empresa = new Empresa();
    this.pacoteExistente = new PacoteResponse();
    this.produtosToDelete = [];
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
    this.empresa = this.empresaService.getEmpresaLogada();
    this.pacoteService.getAllFormasPagamento().subscribe((data: any) => {
      this.formaPagamentoList = data as FormaPagamento[];
    }, error => {
      this.utilsService.messageDisplayError("Erro desconhecido! Lamentamos")
      this.navController.navigateBack("/empresa/pacotes")
    });

    this.pacoteService.getAllFormasEntrega().subscribe((data: any) => {
      this.formaEntregaList = data as FormaEntrega[];
    }, error => {
      this.utilsService.messageDisplayError("Erro desconhecido! Lamentamos")
      this.navController.navigateBack("/empresa/pacotes")
    });

    let id = this.activatedRoute.snapshot.params['idPacote'];
    if (id != null) {
      this.getPacote(parseInt(id));
    }
  }

  getPacote(id: number) {
    this.pacoteService.getPacoteById(id).subscribe((pacote) => {
      this.pacoteExistente = <PacoteResponse>(pacote);
      console.log(this.pacoteExistente);
      this.inputs.idPacote = this.pacoteExistente.idPacote;
      this.inputs.nmPacote = this.pacoteExistente.nmPacote;
      this.inputs.preco = this.pacoteExistente.preco;
      this.inputs.idEmpresa = this.pacoteExistente.idEmpresa;
      this.inputs.idFoto = this.pacoteExistente.foto.idFoto;
      this.foto.fotoUrl = this.pacoteExistente.foto.fotoUrl;
      this.inputs.produtos = this.pacoteExistente.produtos;
      this.inputs.formasEntrega = this.pacoteExistente.formasEntregas;
      this.inputs.formasPagamento = this.pacoteExistente.formasPagamentos;

      this.formaEntregaList.forEach(formaEntrega => {
        formaEntrega.selecionado = this.pacoteExistente.formasEntregas.some(fe => fe.idFormaEntrega === formaEntrega.idFormaEntrega);
      });

      this.formaPagamentoList.forEach(formaPagamento => {
        formaPagamento.selecionado = this.pacoteExistente.formasPagamentos.some(fp => fp.idFormaPagamento === formaPagamento.idFormaPagamento);
      });
    })
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


  addProduto() {
    this.inputs.produtos.push(this.produto);
    console.log(this.inputs.produtos)
    this.produto = new Produto();
  }

  removerProduto(index: number) {
    let produto = this.inputs.produtos[index];
    if (produto.idProduto > 0) {
      this.produtosToDelete.push(produto);
    }

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

  salvar() {
    this.inputs.idPacote > 0 ? this.alterarPacote() : this.criarPacote();
  }


  async alterarPacote() {
    try {
      console.log(this.pacoteExistente.foto.idFoto);
      // if (this.foto.document != null) {
      //   this.fotoService.put(this.foto.idFoto, this.foto.document!).subscribe({
      //     next: (foto) => {
      //     },
      //     error: (error) => {
      //       this.utilsService.messageDisplayError("Erro ao alterar foto!")
      //       console.log(error)
      //     }
      //   });
      // }

      let pacote = new Pacote();
      pacote.idEmpresa = this.empresa.idEmpresa;
      pacote.nmPacote = this.inputs.nmPacote;
      pacote.idFoto = this.inputs.idFoto;
      pacote.preco = this.inputs.preco;
      pacote.idPacote = this.inputs.idPacote;
      this.pacoteService.putPacote(pacote).subscribe({
        next: (response) => {
          this.utilsService.messageDisplaySuccess("Pacote alterado com sucesso!")
          pacote = <Pacote>(response);
        },
        error: (error) => {
          this.utilsService.messageDisplayError("Erro ao alterar pacote!")
          console.log(error)
        }
      })

      for (const produto of this.inputs.produtos) {
        if (produto.idProduto === 0) {
          produto.idPacote = this.inputs.idPacote;
          await this.pacoteService.postProduto(produto).toPromise();
        }
      }

      for (const formaEntrega of this.pacoteExistente.formasEntregas) {
        let count = 0;
        for (const formaEntregInputs of this.inputs.formasEntrega) {
          if (formaEntrega.idFormaEntrega === formaEntregInputs.idFormaEntrega) {
            count++;
          }
        }
        if (count === 0) {
          const pacoteFormaEntrega = new PacoteFormaEntrega();
          pacoteFormaEntrega.idFormaEntrega = formaEntrega.idFormaEntrega;
          pacoteFormaEntrega.idPacote = this.inputs.idPacote;
          console.log("batata")
          this.pacoteService.deletePacoteFormaEntrega(pacoteFormaEntrega).subscribe({
            error: (error) => {
              console.log(error);
            }
          })
        }
      }

      for (const formaPagamento of this.pacoteExistente.formasPagamentos) {
        let count = 0;
        for (const formaPagamentoInputs of this.inputs.formasPagamento) {
          if (formaPagamento.idFormaPagamento === formaPagamentoInputs.idFormaPagamento) {
            count++;
          }
        }
        if (count === 0) {
          const pacoteFormaPagamento = new PacoteFormaPagamento();
          pacoteFormaPagamento.idFormaPagamento = formaPagamento.idFormaPagamento;
          console.log("batata2")
          pacoteFormaPagamento.idPacote = this.inputs.idPacote;
          this.pacoteService.deletePacoteFormaPagamento(pacoteFormaPagamento).subscribe({
            error: (error) => {
              console.log(error);
            }
          })
        }
      }

      for (const formaEntrega of this.inputs.formasEntrega) {
        console.log(this.inputs.formasEntrega)
        const existe = this.pacoteExistente.formasEntregas.find(fe => fe.idFormaEntrega === formaEntrega.idFormaEntrega);
        console.log(existe);
        if (existe === undefined) {
          const pacoteFormaEntrega = new PacoteFormaEntrega();
          pacoteFormaEntrega.idFormaEntrega = formaEntrega.idFormaEntrega;
          pacoteFormaEntrega.idPacote = this.inputs.idPacote;
          await this.pacoteService.postFormaEntrega(pacoteFormaEntrega).toPromise();
        }
      }

      for (const formaPagamento of this.inputs.formasPagamento) {
        const existe = this.pacoteExistente.formasPagamentos.find(fp => fp.idFormaPagamento === formaPagamento.idFormaPagamento);
        if (!existe) {
          const pacoteFormaPagamento = new PacoteFormaPagamento();
          pacoteFormaPagamento.idFormaPagamento = formaPagamento.idFormaPagamento;
          pacoteFormaPagamento.idPacote = this.inputs.idPacote;
          await this.pacoteService.postFormaPagamento(pacoteFormaPagamento).toPromise();
        }
      }

      for (let produto of this.produtosToDelete) {
        console.log(this.produtosToDelete)
        this.pacoteService.deleteProduto(produto.idProduto).subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (error) => {
            console.log(error)
          }
        })
      }

    } catch (error) {
      this.utilsService.messageDisplayError("Erro aao alterar algums informações do pacote.");
      console.log(error);
    }
  }

  async criarPacote() {
    try {
      const foto = await this.fotoService.post(this.foto.document!).toPromise();
      this.inputs.idFoto = foto!.idFoto;

      const pacote = new Pacote();
      pacote.idEmpresa = this.empresa.idEmpresa;
      pacote.nmPacote = this.inputs.nmPacote;
      pacote.idFoto = this.inputs.idFoto;
      pacote.preco = this.inputs.preco;

      const pacoteSalvo = await this.pacoteService.postPacote(pacote).toPromise();
      this.inputs.idPacote = pacoteSalvo!.idPacote;

      for (const produtoResponse of this.inputs.produtos) {
        produtoResponse.idPacote = this.inputs.idPacote;
        await this.pacoteService.postProduto(produtoResponse).toPromise();
      }

      for (const formaEntrega of this.inputs.formasEntrega) {
        const pacoteFormaEntrega = new PacoteFormaEntrega();
        pacoteFormaEntrega.idFormaEntrega = formaEntrega.idFormaEntrega;
        pacoteFormaEntrega.idPacote = this.inputs.idPacote;
        await this.pacoteService.postFormaEntrega(pacoteFormaEntrega).toPromise();
      }

      for (const formaPagamento of this.inputs.formasPagamento) {
        const pacoteFormaPagamento = new PacoteFormaPagamento();
        pacoteFormaPagamento.idFormaPagamento = formaPagamento.idFormaPagamento;
        pacoteFormaPagamento.idPacote = this.inputs.idPacote;
        await this.pacoteService.postFormaPagamento(pacoteFormaPagamento).toPromise();
      }

      this.utilsService.messageDisplaySuccess("Pacote salvo com sucesso!");
      this.navController.navigateBack("/empresa/pacotes");
    } catch (error) {
      console.error('Erro ao salvar pacote:', error);
      this.utilsService.messageDisplayError("Erro ao salvar pacote.");
    }

  }

}

