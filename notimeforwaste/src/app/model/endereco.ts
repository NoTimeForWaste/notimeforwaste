export class Endereco {
    idEndereco: number;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    numero: number;
    complemento: string;
    apelido: string;

    constructor() {
        this.idEndereco = 0;
        this.rua = '';
        this.bairro = '';
        this.cidade = '';
        this.estado = '';
        this.cep = '';
        this.numero = 0;
        this.complemento = '';
        this.apelido = '';
    }
}
