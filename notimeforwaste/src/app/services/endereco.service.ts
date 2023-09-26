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
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  ///api/notimeforwaste/empresa

 private url = environment.api_url + "/endereco";

  constructor(private httpClient: HttpClient, private router: Router) {  
  }

  post(endereco: Endereco): Observable<any> {
    return this.httpClient.post<any>(this.url, endereco, this.httpHeaders);
  }
}