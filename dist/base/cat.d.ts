export declare class EstadoBase {
    constructor();
    obtenerEstadoBase(est: number): "RECIBIDO" | "PREPROCENDADO" | "DURMIENDO" | "TRABAJANDO" | "MODELADO" | "CERRADO";
    obtenerCodigoBase(estado: string): 10 | 20 | 30 | 40 | 50 | 60 | 0;
    estadoInicialBase(): number;
    preprocesar(estActual: Number): 20 | 0;
    dormir(estActual: Number): 30 | 0;
    trabajar(estActual: Number): 40 | 0;
    modelado(estActual: Number): 50 | 0;
    cerrar(estActual: Number): 30 | 0;
    cambiarEstado(estadoAntiguo: string, estadoNuevo: string): boolean;
}
