export class Foto {
    fotoUrl?: string | any;
    idFoto: number;
    document?: File;

    constructor(){
        this.fotoUrl = '';
        this.idFoto = 0;
        this.document = undefined;
    }
}
