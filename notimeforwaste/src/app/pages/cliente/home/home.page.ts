import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pacotes: PacoteResponse[];
  constructor(private loadingController: LoadingController, private empresaService: EmpresaService, private toastController: ToastController, private paccoteService: PacoteService) {
    this.pacotes = [];
  }



  ngOnInit() {

  }

  async carregarPacotes() {
    this.paccoteService.getAllPacotes().subscribe(res => {
      console.log(res)
      this.pacotes = res as PacoteResponse[];
    }, error => {
      console.log(error);
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    await this.carregarPacotes();
  }


  // exibirLoader() {
  //   this.loadingController.create({
  //     message: 'Carregando...'
  //   }).then((res) => {
  //     res.present();
  //   })
  // }

  // fecharLoader() {
  //   setTimeout(() => {
  //     this.loadingController.dismiss().then(() => {
  //     }).catch((erro) => {
  //       console.log('Erro: ', erro)
  //     });
  //   }, 500);
  // }


}
