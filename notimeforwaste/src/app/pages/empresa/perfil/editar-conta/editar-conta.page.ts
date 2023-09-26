import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { Foto } from 'src/app/model/foto';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { FotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-editar-conta',
  templateUrl: './editar-conta.page.html',
  styleUrls: ['./editar-conta.page.scss'],
})
export class EditarContaPage implements OnInit {
  formGroup: FormGroup;
  empresa: Empresa;
  foto: Foto;

  constructor(private fotoService: FotoService, private toastController: ToastController, private empresaService: EmpresaService, private navController: NavController, private fBuilder: FormBuilder) {
    this.empresa = this.empresaService.getEmpresa();
    console.log(this.empresaService.getEmpresa())
    this.foto = new Foto();
    this.formGroup = this.fBuilder.group(
      {
        'nmEmpresa': [this.empresa.nmEmpresa, Validators.compose([
          Validators.required,
        ])],
        'cnpj': [this.empresa.cnpj, Validators.compose([
          Validators.required
        ])],
        'telefone': [this.empresa.telefone, Validators.compose([
          Validators.required
        ])],
        'email': [this.empresa.email, Validators.compose([
          Validators.required
        ])],
      });
   }

  ngOnInit() {
    this.fotoService.get(this.empresa.idEmpresa).subscribe(
      foto => {
        console.log('Foto obtida com sucesso:', foto);
        this.foto = foto;
      },
      error => {
        console.error('Erro ao obter a foto:', error);
      }
    );
    
  }

  salvar() {
    if (!this.isValid()) {
      return;
    }
  
    this.empresaService.update(this.empresa!).then((response: any) => {
      if (response.status === 200) {
        this.empresa = <Empresa>(response.body)
        this.empresaService.setEmpresa(this.empresa); 
        this.exibirMensagem('Alterado com sucesso!');
        console.log(this.empresa)
      } else  {
        this.exibirMensagem(response.error);
      } 
    }).catch((erro) => {
      this.exibirMensagem("Erro ao alterar!");
    });

    this.fotoService.update(this.foto);
  }
  
  
  isValid(): boolean{
    let nmEmpresa = this.formGroup.value.nmEmpresa;
    let telefone = this.formGroup.value.telefone;

    if(nmEmpresa != "" && telefone != ""){
      this.empresa.telefone = telefone;
      this.empresa.nmEmpresa = nmEmpresa;
      return true;
    }
    return false;
  }

  openImagePicker(event: MouseEvent) {
    const inputElement = (event.currentTarget as HTMLElement).querySelector(
      'input'
    );
    inputElement?.click();
  }

  onImageSelected(event: any) {
    this.fotoService.setFotoDocument(event, this.foto);
  }


  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }


}
