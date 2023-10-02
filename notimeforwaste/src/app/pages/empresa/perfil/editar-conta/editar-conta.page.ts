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
    this.empresa = this.empresaService.getEmpresaLogada();
    console.log(this.empresaService.getEmpresaLogada())
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
    this.fotoService.getById(this.empresa.idFoto).subscribe(
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
    this.empresaService.put(this.empresa!).subscribe((resposne) => {
      if(resposne.status === 200){
        this.exibirMensagem("Alteração feita com sucesso!")
        this.empresa = <Empresa>(resposne.body);
        this.empresaService.setEmpresaLogada(this.empresa);
      }else if(resposne.status == 404){
        this.exibirMensagem("Sessão expirada! Faça login antes de continuar.")
        this.empresaService.setEmpresaLogada(new Empresa());
        this.navController.navigateBack("empresa/login");
      }else{
        this.exibirMensagem("Erro ao alterar.")
      }
    }, (error) => {
      this.exibirMensagem("Erro ao alterar.");
      console.log("Erro ao alterar: "+error)
    });

    this.fotoService.put(this.foto.idFoto, this.foto.document!).subscribe((response) => {

    }, (error) => {
      this.exibirMensagem("Erro ao alterar foto.")
      console.log(error)
    });
  }


  isValid(): boolean {
    let nmEmpresa = this.formGroup.value.nmEmpresa;
    let telefone = this.formGroup.value.telefone;

    if (nmEmpresa != "" && telefone != "") {
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
