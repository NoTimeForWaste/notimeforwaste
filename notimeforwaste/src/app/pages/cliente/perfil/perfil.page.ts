import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  /*
  cliente: Cliente;
  constructor(private clienteService: ClienteService, private navController: NavController) {
    this.cliente = this.clienteService.getcliente();
    console.log(this.clienteService.getcliente())
   }
*/

  ngOnInit() {
  }


/*
  logout(){
    this.clienteService.setcliente(new cliente());
    this.navController.navigateBack("cliente/login");
  }

*/

}
