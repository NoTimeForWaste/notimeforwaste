import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController: ToastController) { }

  async MessageDisplaySuccess(texto: string) {
    const toast = await this.toastController.create({
      color: 'success',
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async MessageDisplayAlert(texto: string) {
    const toast = await this.toastController.create({
      color: 'warning',
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async MessageDisplayError(texto: string) {
    const toast = await this.toastController.create({
      color: 'danger',
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  priceToString(valor: number): string {
    const valorFormatado = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return valorFormatado;
  }
}
