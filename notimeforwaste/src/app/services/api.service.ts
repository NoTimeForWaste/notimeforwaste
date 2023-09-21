import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }
  private apiUrl = environment.api_url; //'http://localhost:8087/api/notimeforwaste'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) {}

  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get(url: string, responseType: any = null): Observable<any> {
    return this.http.get(this.apiUrl + url, {
      ...this.httpOptions,
      responseType: responseType || 'json'
    }).pipe(catchError(this.handleError));
  }

  delete(url: string, responseType: any = null): Observable<any> {
    return this.http.delete(this.apiUrl + url, {
      ...this.httpOptions,
      responseType: responseType || 'json'
    }).pipe(catchError(this.handleError));
  }

  post(url: string, data: any, responseType: any = null): Observable<any> {
    return this.http.post(this.apiUrl + url, data, {
      ...this.httpOptions,
      responseType: responseType || 'json'
    });
  }
}
