export class Produto {
    idProduto: number;
    nmProduto: string;
    idPacote: number;
    dtValidade: Date;
    descricao: string;

    constructor(){
        this.idPacote = 0;
        this.nmProduto = '';
        this.idProduto = 0;
        this.dtValidade = new Date();
        this.descricao = '';

    }
  }
  