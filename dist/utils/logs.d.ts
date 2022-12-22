export declare class MiLogger {
    private usuario;
    private idFuncion;
    private descrFuncion?;
    constructor(usuario: string, idFuncion: number, descrFuncion?: string);
    crearLogBdd(msg: string, body?: any): string;
    crearLog(msg: string): void;
    crearLogYSalida(msg: string, tipoMsg: number, body?: any): import("./salida.model").salida;
}
