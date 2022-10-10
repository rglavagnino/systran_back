import mongoose from 'mongoose';
export declare const BaseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    activo: number;
    nombre: string;
    fecha: Date;
    log: string[];
    estado: {
        fecha: Date;
        activo?: number;
        estado?: string;
    }[];
    version: {
        activo: number;
        fecha: Date;
        dueño?: string;
        version?: string;
        nombre_archivo?: string;
        numero_registros?: number;
    }[];
    tipo?: string;
    departamento?: string;
    dueño?: string;
    observaciones?: string;
}>;
export interface BaseModel extends mongoose.Document {
    activo: Number;
    nombre: String;
    departamento?: String;
    dueño?: String;
    fecha: Date;
    tipo?: String;
    log?: String[];
    observacion?: String;
    estado?: any[];
    version?: any[];
}
