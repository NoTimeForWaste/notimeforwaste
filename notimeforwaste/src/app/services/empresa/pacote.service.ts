import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  getAllFormasPagamento() {
    let url = this.url + "/formapagamento"; 
    return this.httpClient.get(url, this.httpHeaders);
  }
}
