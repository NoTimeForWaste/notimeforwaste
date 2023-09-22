import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  constructor(private clienteService: ClienteService) {
    console.log(this.clienteService.getCliente())
   }
  ngOnInit() {
  }


}
