import { BaseModel } from 'src/models/base.model';
import mongoose, { Model } from 'mongoose';
export declare class BaseService {
    private readonly baseModel;
    constructor(baseModel: Model<BaseModel>);
    insertarBase(nombreBase: string, departamento: string, dueño: string, tipo: string, usuario: string): Promise<any>;
    eliminarBase(idBase: string, usuario: string): Promise<any>;
    actualizarBase(idBase: string, usuario: string, nombre?: string, departamento?: string, tipo?: string, dueño?: string): Promise<import("../utils/salida.model").salida>;
    obtenerBasesActiva(usuario: string): Promise<any>;
    obtenerBasesPorId(idBase: string, usuario: string): Promise<any>;
    ejecutarConsultaBase(query: any, usuario: string): Promise<(BaseModel & {
        _id: mongoose.Types.ObjectId;
    })[]>;
}
