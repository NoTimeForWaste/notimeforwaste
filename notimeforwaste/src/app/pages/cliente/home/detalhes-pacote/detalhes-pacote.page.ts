import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PacoteResponse } from 'src/app/model/response/pacote-response';
import { PacoteService } from 'src/app/services/empresa/pacote.service';

@Component({
  selector: 'app-detalhes-pacote',
  templateUrl: './detalhes-pacote.page.html',
  styleUrls: ['./detalhes-pacote.page.scss'],
})
export class DetalhesPacotePage implements OnInit {

  pacote: PacoteResponse;
  constructor(private navController: NavController, private activatedRoute: ActivatedRoute, private pacoteService: PacoteService) {
    this.pacote = new PacoteResponse();
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['idPacote'];
    if (id != null) {
      this.getPacote(parseInt(id));
    } else {
      this.navController.navigateBack("/cliente/home")
    }
  }

  getPacote(id: number) {
    this.pacoteService.getPacoteById(id).subscribe((pacote) => {
      this.pacote = <PacoteResponse>(pacote);
      console.log(this.pacote);
    });
  }

}
