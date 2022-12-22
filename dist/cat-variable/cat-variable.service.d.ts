import { catVariableModel } from 'src/models/categoriaVariable.Model';
import { Model } from 'mongoose';
export declare class CatVariableService {
    private readonly catVariableModel;
    constructor(catVariableModel: Model<catVariableModel>);
    obtenerCategoria(usuario: string): Promise<import("../utils/salida.model").salida>;
    insertarCategoria(descr: string, dueño: string, usuario: string, imagen?: string, variables?: string[]): Promise<import("../utils/salida.model").salida>;
    eliminarCategoria(cat: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    insertarVariables(usuario: string, cat: string, variables: string[]): Promise<import("../utils/salida.model").salida>;
    eliminarVariables(cat: string, variable: string[], usuario: string): Promise<import("../utils/salida.model").salida>;
    actualizarCategorias(usuario: string, cat: string, descripcion?: string, dueño?: string): Promise<import("../utils/salida.model").salida>;
    obtenerData(usuario: string, categoria: string): Promise<import("../utils/salida.model").salida>;
}
