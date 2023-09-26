import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  empresa: Empresa;
  constructor(private empresaService: EmpresaService, private navController: NavController) {
    this.empresa = this.empresaService.getEmpresa();
    console.log(this.empresaService.getEmpresa())
   }

  ngOnInit() {
  }

  logout(){
    this.empresaService.setEmpresa(new Empresa());
    this.navController.navigateBack("empresa/login");
  }
}
