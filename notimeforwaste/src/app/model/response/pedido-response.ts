import { Endereco } from "../endereco";
import { PacoteResponse } from "./pacote-response";

export class PedidoResponse {
    idPedido: number;
    idCliente: number;
    nmCliente: string;
    endereco: Endereco;
    status: string;
    cancelado: boolean;
    frete: number;
    idFormaEntrega: number;
    idFomPagamento: number;
    pacote: PacoteResponse;
  
    constructor() {
      this.idPedido = 0;
      this.idCliente = 0;
      this.nmCliente = '';
      this.endereco = new Endereco();
      this.status = '';
      this.cancelado = false;
      this.frete = 0;
      this.idFormaEntrega = 0;
      this.idFomPagamento = 0;
      this.pacote = new PacoteResponse();
    }
  }
  