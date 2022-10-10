import mongoose, { ObjectId } from "mongoose";
export declare const variableSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    activo: number;
    nombre_variable: string;
    desechado: number;
    log: string[];
    fecha: Date;
    codigo_variable?: string;
    descripcion?: string;
    nombre_normalizado?: string;
    base?: mongoose.Types.ObjectId;
}>;
export interface VariableModel extends mongoose.Document {
    activo?: number;
    nombre_variable: string;
    nombre_normalizado: string;
    codigo_variable: string;
    desechado: number;
    descripcion: string;
    base: ObjectId;
    log: string[];
}
