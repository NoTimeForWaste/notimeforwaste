import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  
  cliente: Cliente;
  constructor(private clienteService: ClienteService, private navController: NavController) {
    this.cliente = new Cliente();
    console.log(this.cliente)

   }


  ngOnInit() {
    this.cliente = this.clienteService.getClienteLogado();
  }



  logout(){
    this.clienteService.setClienteLogado(new Cliente());
    this.navController.navigateBack("cliente/login");
  }



}
