import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { Endereco } from 'src/app/model/endereco';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  empresa: Empresa;
  endereco: Endereco;
  constructor(private empresaService: EmpresaService, private enderecoService: EnderecoService, private navController: NavController) {
    this.empresa = new Empresa();
    this.endereco = new Endereco();
    console.log(this.empresaService.getEmpresaLogada())
  }

  ngOnInit() {
    this.empresa = this.empresaService.getEmpresaLogada()
    this.enderecoService.getById(this.empresa.idEndereco).subscribe((endereco) => {
      this.endereco = <Endereco>(endereco);
    });
  }

  logout() {
    this.empresaService.setEmpresaLogada(new Empresa());
    this.navController.navigateBack("empresa/login");
  }

  enderecoToString(): string {
    return this.endereco.rua + " " + this.endereco.numero + ", " + this.endereco.bairro + ", " + this.endereco.cidade + " - " + this.endereco.estado;
  }
}
