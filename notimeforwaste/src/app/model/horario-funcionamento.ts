import { Time } from "@angular/common";

export class HorarioFuncionamento {
    idHorario: number;
    nome: string;
    horarioInicial: Time;
    horarioFinal: Time;
    idEmpresa: number;

    constructor(){
        this.horarioFinal = {hours: 0, minutes: 0};
        this.horarioInicial = {hours: 0, minutes: 0};
        this.idEmpresa = 0;
        this.idHorario = 0;
        this.nome = '';
    }
}
