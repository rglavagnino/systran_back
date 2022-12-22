import { Model } from 'mongoose';
import { VariableModel } from 'src/models/variable.model';
export declare class VariableService {
    private readonly variableModel;
    constructor(variableModel: Model<VariableModel>);
    insertarVariable(nombre: string, norm: string, codigo: string, desechado: number, descr: string, base: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    eliminarVariable(id: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    actualizarVariable(variable: string, usuario: string, nombre?: string, norm?: string, codigo?: string, desechado?: number, descr?: string): Promise<import("../utils/salida.model").salida>;
    obtenerVariableBase(base: any, usuario: string): Promise<import("../utils/salida.model").salida>;
    obtenerTodasVariables(usuario: string): Promise<import("../utils/salida.model").salida>;
    obtenerDataporBase(usuario: string, base: string): Promise<import("../utils/salida.model").salida>;
    obtenerData(usuario: string): Promise<import("../utils/salida.model").salida>;
}
