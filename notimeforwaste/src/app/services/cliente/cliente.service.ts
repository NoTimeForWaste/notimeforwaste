import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Cliente } from 'src/app/model/cliente';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  ///api/notimeforwaste/empresa

  private url = environment.api_url + "/cliente";
  private cliente: Cliente;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.cliente = new Cliente();

  }
  // Método para criar um cliente
  post(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.url, cliente, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para fazer login
  login(email: string, senha: string): Observable<HttpResponse<Cliente>> {
    const url = `${this.url}/login/${email}/${senha}`;
    return this.httpClient.get<Cliente>(url, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obter um cliente por ID
  getById(id: number): Observable<Cliente> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Cliente>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obter um cliente por e-mail
  getByEmail(email: string): Observable<Cliente> {
    const url = `${this.url}/${email}`;
    return this.httpClient.get<Cliente>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para atualizar um cliente
  put(cliente: Cliente): Observable<Cliente> {
    const url = `${this.url}/${cliente.idCliente}`;
    return this.httpClient.put<Cliente>(url, cliente, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  existsByEmail(email: string): Observable<number> {
    const url = `${this.url}/existsbyemail/${email}`;
    return this.httpClient.get<number>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Tratamento de erro genérico
  private handleError(error: any) {
    if (error.status === 404 || error.status === 409) {
      return of(error);
    } else {
      console.error('Ocorreu um erro:', error);
      return throwError('Erro! Status do código: ' + error);
    }
  }


  getClienteLogado(): Cliente {
    let cliente = JSON.parse(localStorage.getItem('Cliente') || '[]') as Cliente;
    return cliente;
  }

  setClienteLogado(cliente: Cliente): void {
    localStorage.setItem('Cliente', JSON.stringify(cliente));
    this.cliente = cliente;
  }

}
