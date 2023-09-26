export class FormaEntrega {
  idFormaEntrega: number;
  nome: string;
  selecionado: boolean;

  constructor() {
    this.idFormaEntrega = 0;
    this.nome = '';
    this.selecionado = false; // Inicialize como falso por padrão
  }
}