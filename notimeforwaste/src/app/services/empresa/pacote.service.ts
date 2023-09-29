import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Pacote } from 'src/app/model/pacote';
import { Observable } from 'rxjs';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { FormaEntrega } from 'src/app/model/forma-entrega';
import { PacoteFormaEntrega } from 'src/app/model/pacote-forma-entrega';
import { PacoteFormaPagamento } from 'src/app/model/pacote-forma-pagamento';
import { Produto } from 'src/app/model/produto';
import { PacoteResponse } from 'src/app/model/response/pacote-response';

@Injectable({
  providedIn: 'root'
})
export class PacoteService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private url = environment.api_url + "/pacote";

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastController) { }

  getAllFormasEntrega() {
    let url = this.url + "/formaentrega";
    return this.httpClient.get(url, this.httpHeaders);
  }


  getPacotesByIdEmpresa(idEmpresa: number) {
    console.log(idEmpresa)
    let url = this.url + "/" + idEmpresa + "/byEmpresa";
    return this.httpClient.get(url, this.httpHeaders);
  }

  postFormaEntrega(formasEntrega: PacoteFormaEntrega) {
    let url = this.url + "/formaentrega";
    return this.httpClient.post<FormaEntrega>(url, formasEntrega, this.httpHeaders);
  }

  postFormaPagamento(formaPagamento: PacoteFormaPagamento) {
    let url = this.url + "/formapagamento";
    return this.httpClient.post<FormaPagamento>(url, formaPagamento, this.httpHeaders);
  }

  postProduto(produto: Produto) {
    let url = this.url + "/produto";
    return this.httpClient.post<FormaPagamento>(url, produto, this.httpHeaders);
  }

  getAllFormasPagamento() {
    let url = this.url + "/formapagamento";
    return this.httpClient.get(url, this.httpHeaders);
  }

  delete(idPacote: number) {
    let url = this.url + "/" + idPacote;
    return this.httpClient.delete(url, this.httpHeaders);
  }

  postPacote(pacote: Pacote): Observable<any> {
    return this.httpClient.post<Pacote>(this.url, pacote, this.httpHeaders);
  }
}
