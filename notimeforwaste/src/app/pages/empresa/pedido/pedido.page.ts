import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  onFilters: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  showFilters(){
    this.onFilters = !this.onFilters;
    console.log(this.onFilters)
  }

}
