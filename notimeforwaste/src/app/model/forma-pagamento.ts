export class FormaPagamento {
    idFormaPagamento: number;
    nome: string;
    selecionado: boolean;
  
    constructor() {
      this.idFormaPagamento = 0;
      this.nome = '';
      this.selecionado = false; // Inicialize como falso por padrão
    }
  }
  