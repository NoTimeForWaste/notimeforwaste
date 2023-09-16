import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email?: String;
  senha?: String;
  formGroup: FormGroup;

  constructor(private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {

    this.formGroup = this.fBuilder.group(
      {
        'identificacao': [this.email, Validators.compose([
          Validators.required
        ])],
        'observacao': [this.senha, Validators.compose([
          Validators.required
        ])],

      }
    );
  }

  async salvar(){
    
  }
  ngOnInit() {
  }

}
