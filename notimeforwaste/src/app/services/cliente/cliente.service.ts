import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from 'src/app/model/cliente';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  httpHeaders = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  ///api/notimeforwaste/empresa

 private url = environment.api_url + "/cliente";
 private cliente: Cliente;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.cliente = new Cliente();

  }

  async login(email: String, senha: String){
    let urlAuxiliar = this.url + "/login/" + email + "/" + senha;
    return await this.httpClient.get(urlAuxiliar, { observe: 'response' }).pipe(
      catchError(error => {
        // Retorna apenas os erros 404 e 409 como uma resposta bem-sucedida
        if (error.status === 404 || error.status === 409) {
          return of(error);
        }
        // Para todos os outros erros, rejeita a promessa
        return throwError(error);
      })
    ).toPromise();
  }

  getCliente(): Cliente {
    return this.cliente;
  }
 
  setCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }
}
