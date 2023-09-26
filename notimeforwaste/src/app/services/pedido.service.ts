import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private url = environment.api_url + "/pedido";

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastController) { }

  // Método para buscar pedidos por idEmpresa
  getPedidosByIdEmpresa(idEmpresa: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${this.url}/empresa/${idEmpresa}`, this.httpHeaders).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      });
    });
  }

  // Método para buscar pedidos por idCliente
  getPedidosByIdCliente(idCliente: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${this.url}/cliente/${idCliente}`, this.httpHeaders).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      });
    });
  }
}


