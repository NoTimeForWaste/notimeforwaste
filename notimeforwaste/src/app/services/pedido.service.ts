import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Pedido } from '../model/pedido';
import { PedidoResponse } from '../model/response/pedido-response';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private url = environment.api_url + "/pedido";

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastController) { }

  save(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(`${this.url}`, pedido, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStatus(id: number, status: string): Observable<string> {
    return this.httpClient.put<string>(`${this.url}/status/${id}`, status, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  cancel(id: number): Observable<number> {
    return this.httpClient.put<number>(`${this.url}/cancel/${id}`, this.httpHeaders);
  }

  getById(id: number): Observable<PedidoResponse> {
    return this.httpClient.get<PedidoResponse>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getByEmpresaId(idEmpresa: number): Observable<PedidoResponse[]> {
    return this.httpClient.get<PedidoResponse[]>(`${this.url}/empresa/${idEmpresa}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getByClienteId(idCliente: number): Observable<PedidoResponse[]> {
    return this.httpClient.get<PedidoResponse[]>(`${this.url}/cliente/${idCliente}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    if (error.status === 404 || error.status === 409) {
      return of(error);
    } else {
      console.error('Ocorreu um erro:', error);
      return throwError('Erro! Status do código: ' + error);
    }
  }

}


