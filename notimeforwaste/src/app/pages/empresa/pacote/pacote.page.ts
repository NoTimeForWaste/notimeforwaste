import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { PacoteService } from 'src/app/services/empresa/pacote.service';

@Component({
  selector: 'app-pacote',
  templateUrl: './pacote.page.html',
  styleUrls: ['./pacote.page.scss'],
})
export class PacotePage implements OnInit {

  pacotes: PacoteResponse[];
  empresa: Empresa;
  constructor(private empresaService: EmpresaService,  private toastController: ToastController, private paccoteService: PacoteService) {
    this.pacotes = [];
    this.empresa = new Empresa();
     }

  ngOnInit() {
    // this.empresa = this.empresaService.getEmpresaLogada();
    // this.paccoteService.getPacotesByEmpresaId(this.empresa.idEmpresa).subscribe(res => {
    //   console.log(res)
    //   this.pacotes = res as PacoteResponse[];
    // } , error => {
    //   console.log(error);
    // });
  }

  deletar(idPacote: number){
    // this.paccoteService.delete(idPacote).subscribe(
    //   res => {
    //     this.exibirMensagem("Deletado com sucesso.")
    //     this.pacotes = this.pacotes.filter(pacote => pacote.idPacote !== idPacote);
    //   },
    //   error => {
    //     this.exibirMensagem("Erro ao deletar.")
    //   }
    // );
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
