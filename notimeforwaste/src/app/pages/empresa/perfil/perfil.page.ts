import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { Endereco } from 'src/app/model/endereco';
import { Foto } from 'src/app/model/foto';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { FotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  empresa: Empresa;
  endereco: Endereco;
  foto: Foto;
  constructor(private fotoService: FotoService, private empresaService: EmpresaService, private enderecoService: EnderecoService, private navController: NavController) {
    this.empresa = new Empresa();
    this.endereco = new Endereco();
    this.foto = new Foto();
    console.log(this.empresaService.getEmpresaLogada())
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.empresa = this.empresaService.getEmpresaLogada()
    this.enderecoService.getById(this.empresa.idEndereco).subscribe((endereco) => {
      this.endereco = <Endereco>(endereco);
    });

    this.fotoService.getById(this.empresa.idFoto).subscribe((foto) => {
      this.foto = <Foto>(foto);
      console.log(this.foto.fotoUrl);
    })

  }

  logout() {
    this.empresaService.setEmpresaLogada(new Empresa());
    this.navController.navigateBack("empresa/login");
  }

  enderecoToString(): string {
    return this.endereco.rua + " " + this.endereco.numero + ", " + this.endereco.bairro + ", " + this.endereco.cidade + " - " + this.endereco.estado;
  }
}
