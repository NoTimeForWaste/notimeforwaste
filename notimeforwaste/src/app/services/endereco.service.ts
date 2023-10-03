import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  ///api/notimeforwaste/empresa

  private url = environment.api_url + "/endereco";

  constructor(private httpClient: HttpClient, private router: Router) {
  }
  // Método para salvar um novo endereço
  post(endereco: Endereco): Observable<Endereco> {
    return this.httpClient.post<Endereco>(`${this.url}`, endereco, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para buscar um endereço por ID
  getById(id: number): Observable<Endereco> {
    return this.httpClient.get<Endereco>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para deletar um endereço
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para atualizar um endereço
  put(endereco: Endereco): Observable<Endereco> {
    return this.httpClient.put<Endereco>(`${this.url}/${endereco.idEndereco}`, endereco, this.httpHeaders)
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