import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioFuncionamento } from 'src/app/model/horario-funcionamento';

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

  constructor(private fBuilder: FormBuilder) {
    this.horarioDomingo = new HorarioFuncionamento();
    this.horarioSabado = new HorarioFuncionamento();
    this.horarioSegASex = new HorarioFuncionamento();

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
  }

}
