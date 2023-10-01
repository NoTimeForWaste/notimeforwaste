import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Pacote } from 'src/app/model/pacote';
import { Observable, catchError, throwError } from 'rxjs';
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

  //Método para buscar todas as formas de entrega existentes
  getAllFormasEntrega(): Observable<Pacote[]> {
    let url = this.url + "/formaentrega";
    return this.httpClient.get<Pacote[]>(`${url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Método para buscar todas as formas de pagamento existentes
  getAllFormasPagamento(): Observable<Pacote[]> {
    let url = this.url + "/formapagamento";
    return this.httpClient.get<Pacote[]>(`${url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  postFormaEntrega(formasEntrega: PacoteFormaEntrega) {
    let url = this.url + "/formaentrega";
    return this.httpClient.post<FormaEntrega>(url, formasEntrega, this.httpHeaders);
  }

  postFormaPagamento(formaPagamento: PacoteFormaPagamento) {
    let url = this.url + "/formapagamento";
    return this.httpClient.post<FormaPagamento>(url, formaPagamento, this.httpHeaders);
  }

  // Método para salvar um novo produto
  postProduto(produto: Produto): Observable<Pacote> {
    let url = this.url + "/produto";
    return this.httpClient.post<Pacote>(`${url}`, produto, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Método para salvar um novo pacote
  postPacote(pacote: Pacote): Observable<Pacote> {
    return this.httpClient.post<Pacote>(`${this.url}`, pacote, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para buscar todos os pacotes
  getAllPacotes(): Observable<PacoteResponse[]> {
    return this.httpClient.get<PacoteResponse[]>(`${this.url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para buscar pacote por ID
  getPacoteById(id: number): Observable<Pacote> {
    return this.httpClient.get<Pacote>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para buscar pacotes por ID da Empresa
  getPacotesByEmpresaId(idEmpresa: number): Observable<PacoteResponse[]> {
    return this.httpClient.get<PacoteResponse[]>(`${this.url}/${idEmpresa}/byEmpresa`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para deletar um pacote
  deletePacote(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para atualizar um pacote
  putPacote(id: number, pacote: Pacote): Observable<Pacote> {
    return this.httpClient.put<Pacote>(`${this.url}/${id}`, pacote, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  postPacoteFormaEntrega(pacoteFormaEntrega: PacoteFormaEntrega): Observable<PacoteFormaEntrega> {
    let apiUrl = this.url + '/formaentrega';
    return this.httpClient.post<PacoteFormaEntrega>(apiUrl, pacoteFormaEntrega, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPacoteFormaEntregaByIdPacote(id: number): Observable<PacoteFormaEntrega[]> {
    let apiUrl = this.url + '/formaentrega';
    const url = `${apiUrl}/pacote/${id}`;
    return this.httpClient.get<PacoteFormaEntrega[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deletePacoteFormaEntrega(pacoteFormaEntrega: PacoteFormaEntrega): Observable<any> {
    let apiUrl = this.url + '/formaentrega';
    return this.httpClient.request<PacoteFormaEntrega>('delete', apiUrl, { body: pacoteFormaEntrega })
    .pipe(
      catchError(this.handleError)
    );
  }

  postPacoteFormaPagamento(pacoteFormaPagamento: PacoteFormaPagamento): Observable<PacoteFormaPagamento> {
    let apiUrl = this.url + '/formapagamento';
    return this.httpClient.post<PacoteFormaPagamento>(apiUrl, pacoteFormaPagamento, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPacoteFormaPagamentoByIdPacote(id: number): Observable<PacoteFormaPagamento[]> {
    let apiUrl = this.url + '/formapagamento';
    const url = `${apiUrl}/pacote/${id}`;
    return this.httpClient.get<PacoteFormaPagamento[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deletePacoteFormaPagamento(pacoteFormaPagamento: PacoteFormaPagamento): Observable<any> {
    let apiUrl = this.url + '/formapagamento';
    return this.httpClient.request<PacoteFormaPagamento>('delete', apiUrl, { body: pacoteFormaPagamento })
    .pipe(
      catchError(this.handleError)
    );
  }


  // Tratamento de erro genérico
  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
  }
}
