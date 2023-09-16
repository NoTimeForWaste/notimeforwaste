import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { Empresa } from 'src/app/model/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  httpHeaders = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  ///api/notimeforwaste/empresa

 private url = environment.api_url + "/empresa";
 private empresa: Empresa;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.empresa = new Empresa();

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

  getEmpresa(): Empresa {
    return this.empresa;
  }
 
  setEmpresa(empresa: Empresa): void {
    this.empresa = empresa;
  }
}  
