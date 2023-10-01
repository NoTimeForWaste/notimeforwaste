export class Pedido {
    idPedido: number;
    idCliente: number;
    idPacote: number;
    idEndereco: number;
    status: string;
    idFormaPagamento: number;
    idFormaEntrega: number;
    frete: number;
    cancelado: boolean;
    dtPedido: Date;

    constructor(
    ) {
        this.idPedido = 0;
        this.idCliente = 0;
        this.idPacote = 0;
        this.idEndereco = 0;
        this.status = '';
        this.idFormaPagamento = 0;
        this.idFormaEntrega = 0;
        this.frete = 0;
        this.cancelado = false;
        this.dtPedido = new Date();
    }
}
