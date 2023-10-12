import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { PacoteService } from 'src/app/services/empresa/pacote.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.page.html',
  styleUrls: ['./novo-pedido.page.scss'],
})
export class NovoPedidoPage implements OnInit {

  pacote: PacoteResponse;
  constructor(private navController: NavController, private activatedRoute: ActivatedRoute, private pacoteService: PacoteService) {
    this.pacote = new PacoteResponse();
  }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.params['idPacote'];
    if (id != null) {
      console.log(id)
      this.getPacote(parseInt(id));
    } else {
      this.navController.navigateBack("/cliente/home")
    }
  }

  getPacote(id: number) {
    this.pacoteService.getPacoteById(id).subscribe((pacote) => {
      this.pacote = <PacoteResponse>(pacote);
      console.log(pacote);
    }, (error) => {
      console.log(error);

    });
  }

  back() {
    this.navController.navigateBack('/cliente/detalhes-pacote/' + this.pacote.idPacote);
  }

}
