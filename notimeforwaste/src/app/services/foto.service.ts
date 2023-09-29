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

  post(file: File): Observable<Foto> {
    const formData = new FormData();
    formData.append('document', file);

    return this.httpClient.post<Foto>(this.url, formData);
  }

  get(id: number): Observable<Foto> {
    return this.httpClient.get<Foto>(`${this.url}/${id}`);
  }
  
  update( foto: Foto): Observable<Foto> {
    return this.httpClient.put<Foto>(`${this.url}/${foto.idFoto}`, foto);
  }  
}
 