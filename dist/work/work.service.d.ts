import { Model } from 'mongoose';
import { workModel } from 'src/models/working.model';
export declare class WorkService {
    private readonly workingmodel;
    constructor(workingmodel: Model<workModel>);
    trabajandoen(base: string, usuario: string, operacion?: string): Promise<import("../utils/salida.model").salida>;
    finalizar(base: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    obtenerData(usuario: string): Promise<import("../utils/salida.model").salida>;
}
