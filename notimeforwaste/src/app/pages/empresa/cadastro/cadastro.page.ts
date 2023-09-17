import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  step: number;
  constructor(private empresaService: EmpresaService, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.step =  1;
   }

  ngOnInit() {
  }

  nextStep(){
    this.step++;
  }

  backStep(){
    if(this.step === 1){
      this.navController.navigateBack('/tela-inicial');
    }else{
      this.step--;
    }
  }

}
