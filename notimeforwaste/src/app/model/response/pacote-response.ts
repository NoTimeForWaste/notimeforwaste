import { FormaEntrega } from "../forma-entrega";
import { FormaPagamento } from "../forma-pagamento";
import { Foto } from "../foto";
import { Produto } from "../produto";

export class PacoteResponse {
    idPacote: number;
    nmPacote: string;
    preco: number;
    idEmpresa: number;
    foto: Foto;
    nmEmpresa: string;
    formasEntregas: FormaEntrega[];
    formasPagamentos: FormaPagamento[];
    produtos: Produto[];

    constructor() {
        this.idPacote = 0;
        this.nmPacote = '';
        this.preco = 0;
        this.idEmpresa = 0;
        this.foto = new Foto();
        this.nmEmpresa = '';
        this.formasEntregas = [];
        this.formasPagamentos = [];
        this.produtos = [];
    }
}
