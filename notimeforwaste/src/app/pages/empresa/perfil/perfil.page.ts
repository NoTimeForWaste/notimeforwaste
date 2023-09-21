import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private empresaService: EmpresaService) {
    console.log(this.empresaService.getEmpresa())
   }

  ngOnInit() {
  }

}
