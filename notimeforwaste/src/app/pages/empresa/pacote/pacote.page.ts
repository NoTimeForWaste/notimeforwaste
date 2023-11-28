import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-pacote',
  templateUrl: './pacote.page.html',
  styleUrls: ['./pacote.page.scss'],
})
export class PacotePage implements OnInit {

  pacotes: PacoteResponse[];
  empresa: Empresa;
  constructor(private loadingController: LoadingController, private empresaService: EmpresaService, private toastController: ToastController, private paccoteService: PacoteService, protected utilsService: UtilsService, private alertController: AlertController) {
    this.pacotes = [];
    this.empresa = new Empresa();
  }

  

  ngOnInit() {
   
  }

  async carregarPacotes(){
    this.empresa = this.empresaService.getEmpresaLogada();
    this.paccoteService.getPacotesByEmpresaId(this.empresa.idEmpresa).subscribe(res => {
      console.log(res)
      this.pacotes = res as PacoteResponse[];
    }, error => {
      console.log(error);
    });
  }

  async deletar(idPacote: number) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza de que deseja deletar este pacote?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Deletar',
          handler: () => {
            this.paccoteService.deletePacote(idPacote).subscribe(
              res => {
                this.utilsService.messageDisplaySuccess("Deletado com sucesso.")
                this.pacotes = this.pacotes.filter(pacote => pacote.idPacote !== idPacote);
              },
              error => {
                this.utilsService.messageDisplayError("Erro ao deletar.")
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }
 
  async carregarLista() {
    this.exibirLoader();
    await this.carregarPacotes();
    this.fecharLoader();
  }

  
  exibirLoader(){
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res)=>{
      res.present();
    })
  }

  fecharLoader(){
    setTimeout(()=>{
      this.loadingController.dismiss().then(()=>{
      }).catch((erro)=>{
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  nmProdutosToString(index: number): string{
    let string = '';
    let produtos = this.pacotes[index].produtos;
    for(let produto of produtos){
      string+= produto.nmProduto + ", ";
    }
    return string;
  }
}
