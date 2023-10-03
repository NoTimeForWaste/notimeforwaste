import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';
import { HorarioFuncionamento } from 'src/app/model/horario-funcionamento';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-editar-horario-funcionamento',
  templateUrl: './editar-horario-funcionamento.page.html',
  styleUrls: ['./editar-horario-funcionamento.page.scss'],
})
export class EditarHorarioFuncionamentoPage implements OnInit {
 
  formGroup: FormGroup;
  horarioSegASex: HorarioFuncionamento;
  horarioSabado: HorarioFuncionamento;
  horarioDomingo: HorarioFuncionamento;
  horarios: HorarioFuncionamento[];
  empresa: Empresa;

  constructor(private toastController: ToastController, private fBuilder: FormBuilder, private empresaService: EmpresaService) {
    this.horarioDomingo = new HorarioFuncionamento();
    this.horarioSabado = new HorarioFuncionamento();
    this.horarioSegASex = new HorarioFuncionamento();
    this.empresa = new Empresa();
    this.horarios = [];

    this.formGroup = this.fBuilder.group({
      'hrSegASexI': [this.horarioSegASex.horarioInicial, Validators.compose([
        Validators.required
      ])],
      'hrSegASexF': [this.horarioSegASex.horarioFinal, Validators.compose([
        Validators.required
      ])],
      'hrSabadoI': [this.horarioSabado.horarioInicial, Validators.compose([
        Validators.required
      ])],
      'hrSabadoF': [this.horarioSabado.horarioFinal, Validators.compose([
        Validators.required
      ])],
      'hrDomingoI': [this.horarioDomingo.horarioInicial, Validators.compose([
        Validators.required
      ])],
      'hrDomingoF': [this.horarioDomingo.horarioFinal, Validators.compose([
        Validators.required
      ])]
    }
    )

    
   }

ngOnInit() {
  this.empresa = this.empresaService.getEmpresaLogada();
  this.empresaService.getHorariosFuncionamentoByEmpresaId(this.empresa.idEmpresa).subscribe((response) => {
    this.horarios = <HorarioFuncionamento[]>(response);
    this.horarios.forEach(horario => {
      switch (horario.nome) {
        case 'Segunda à sexta':
          this.formGroup.patchValue({
            'hrSegASexI': horario.horarioInicial,
            'hrSegASexF': horario.horarioFinal,
          });
          break;
        case 'Sábado':
          this.formGroup.patchValue({
            'hrSabadoI': horario.horarioInicial,
            'hrSabadoF': horario.horarioFinal,
          });
          break;
        case 'Domingo':
          this.formGroup.patchValue({
            'hrDomingoI': horario.horarioInicial,
            'hrDomingoF': horario.horarioFinal,
          });
          break;
      }
    });

    console.log(this.horarios);
  });
}

salvar() {
  if (this.formGroup.invalid) {
    return;
  }

  // Criar e atualizar os horários para segunda a sexta
  const horarioSegASex: HorarioFuncionamento = {
    idHorario: this.horarios.find(horario => horario.nome === 'Segunda à sexta')?.idHorario || 0,
    nome: 'Segunda à sexta',
    horarioInicial: this.formGroup.get('hrSegASexI')!.value,
    horarioFinal: this.formGroup.get('hrSegASexF')!.value,
    idEmpresa: this.empresa.idEmpresa
  };

  // Criar e atualizar os horários para sábado
  const horarioSabado: HorarioFuncionamento = {
    idHorario: this.horarios.find(horario => horario.nome === 'Sábado')?.idHorario || 0,
    nome: 'Sábado',
    horarioInicial: this.formGroup.get('hrSabadoI')!.value,
    horarioFinal: this.formGroup.get('hrSabadoF')!.value,
    idEmpresa: this.empresa.idEmpresa
  };

  // Criar e atualizar os horários para domingo
  const horarioDomingo: HorarioFuncionamento = {
    idHorario: this.horarios.find(horario => horario.nome === 'Domingo')?.idHorario || 0,
    nome: 'Domingo',
    horarioInicial: this.formGroup.get('hrDomingoI')!.value,
    horarioFinal: this.formGroup.get('hrDomingoF')!.value,
    idEmpresa: this.empresa.idEmpresa,
  
  };

  // Chamar o serviço para atualizar os horários
  this.empresaService.updateHorarioFuncionamento(horarioSegASex).subscribe(
    (horarioAtualizado) => {
      console.log('Horário de funcionamento (Segunda à sexta) atualizado com sucesso:', horarioAtualizado);
      // Lide com o sucesso aqui
    },
    (error) => {
      console.error('Erro ao atualizar o horário de funcionamento (Segunda à sexta):', error);
      this.exibirMensagem("Erro ao alterar horário de Segunda à Sexta")
    }
  );

  this.empresaService.updateHorarioFuncionamento(horarioSabado).subscribe(
    (horarioAtualizado) => {
      console.log('Horário de funcionamento (Sábado) atualizado com sucesso:', horarioAtualizado);
      // Lide com o sucesso aqui
    },
    (error) => {
      console.error('Erro ao atualizar o horário de funcionamento (Sábado):', error);
      this.exibirMensagem("Erro ao alterar horário de Sábado")
    }
  );

  this.empresaService.updateHorarioFuncionamento(horarioDomingo).subscribe(
    (horarioAtualizado) => {
      console.log('Horário de funcionamento (Domingo) atualizado com sucesso:', horarioAtualizado);
      // Lide com o sucesso aqui
    },
    (error) => {
      console.error('Erro ao atualizar o horário de funcionamento (Domingo):', error);
      this.exibirMensagem("Erro ao alterar horário de Domingo")
    }
  );
}


async exibirMensagem(texto: string) {
  const toast = await this.toastController.create({
    message: texto,
    duration: 1500
  });
  toast.present();
}

}
