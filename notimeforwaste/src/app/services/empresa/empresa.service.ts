import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Empresa } from 'src/app/model/empresa';
import { HorarioFuncionamento } from 'src/app/model/horario-funcionamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  ///api/notimeforwaste/empresa

  private url = environment.api_url + "/empresa";
  private urlHorarioFuncionamento = environment.api_url + "/empresa/horariofuncionamento";

  private empresa: Empresa;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.empresa = new Empresa();

  }

  // Método para criar uma empresa
  post(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(this.url, empresa, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para atualizar uma empresa
  put(empresa: Empresa): Observable<HttpResponse<Empresa>> {
    const url = `${this.url}/${empresa.idEmpresa}`;
    return this.httpClient.put<Empresa>(url, empresa, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  //Método para fazer login 
  login(email: string, senha: string): Observable<HttpResponse<Empresa>> {
    const url = `${this.url}/login/${email}/${senha}`;
    return this.httpClient.get<Empresa>(url, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }


  // Método para obter uma empresa por ID
  findById(id: number): Observable<Empresa> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Empresa>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para listar todas as empresas
  findAll(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para excluir uma empresa por ID
  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para verificar se existe uma empresa com o mesmo e-mail
  existsByEmail(email: string): Observable<number> {
    const url = `${this.url}/existsbyemail/${email}`;
    return this.httpClient.get<number>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para verificar se existe uma empresa com o mesmo CNPJ
  existsByCNPJ(cnpj: string): Observable<number> {
    const url = `${this.url}/existsbycnpj/${cnpj}`;
    return this.httpClient.get<number>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  //Método para retornar a empresa logada no sistema
  getEmpresaLogada(): Empresa {
    let empresa = JSON.parse(localStorage.getItem('Empresa') || '[]') as Empresa;
    return empresa;
  }

  //Método para setar a empresa logada no sistema
  setEmpresaLogada(empresa: Empresa): void {
    localStorage.setItem('Empresa', JSON.stringify(empresa));
    this.empresa = empresa;
  }

  // Método para salvar um novo horário de funcionamento
  saveHorarioFuncionamento(horario: any): Observable<HorarioFuncionamento> {
    return this.httpClient.post<HorarioFuncionamento>(`${this.urlHorarioFuncionamento}`, horario, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para buscar um horário de funcionamento por ID
  getHorarioFuncionamentoById(id: number): Observable<HorarioFuncionamento> {
    return this.httpClient.get<HorarioFuncionamento>(`${this.urlHorarioFuncionamento}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para buscar horários de funcionamento por ID de empresa
  getHorariosFuncionamentoByEmpresaId(id: number): Observable<HorarioFuncionamento[]> {
    return this.httpClient.get<HorarioFuncionamento[]>(`${this.urlHorarioFuncionamento}/${id}/byempresa`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para atualizar um horário de funcionamento
  updateHorarioFuncionamento(id: number, horario: HorarioFuncionamento): Observable<HorarioFuncionamento> {
    return this.httpClient.put<HorarioFuncionamento>(`${this.urlHorarioFuncionamento}/${id}`, horario, this.httpHeaders)
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
}  
