import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foto } from '../model/foto';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class FotoService {


  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  ///api/notimeforwaste/empresa

  private url = environment.api_url + "/foto";

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastController,
  ) {
  }

  setFotoDocument(event: any, foto: Foto) {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.includes('image')) {
        this.toastr.create({
          message: 'Imagem deve ser um .jpg, .jpeg ou .png',
          duration: 1500
        });
        return;
      }
      foto.document = file;
      // Create an object of FileReader
      let reader = new FileReader();
      // Read the uploaded file into the FileReader object
      reader.readAsDataURL(file);
      // Set the image preview
      reader.onload = (_event) => {
        foto.fotoUrl = reader.result;
      };
    }
  }

   // Método para enviar uma nova foto
   post(document: File): Observable<Foto> {
    const formData = new FormData();
    formData.append('document', document);
    return this.httpClient.post<Foto>(`${this.url}`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para buscar uma foto por ID
  getById(id: number): Observable<Foto> {
    return this.httpClient.get<Foto>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para atualizar uma foto
  put(id: number, document: File): Observable<Foto> {
    return this.httpClient.put<Foto>(`${this.url}/${id}`, document)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para deletar uma foto
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`)
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
 