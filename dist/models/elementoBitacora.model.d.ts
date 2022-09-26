import mongoose from "mongoose";
export declare const elementoBitacoraSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    activo: number;
    fecha: Date;
    tipo: {
        activo: number;
        fecha: Date;
        tid?: number;
        usuario?: string;
    }[];
    estado: {
        activo: number;
        fecha: Date;
        usuario?: string;
        oid?: number;
    }[];
    observaciones: {
        activo: number;
        fecha: Date;
        usuario?: string;
        observaciones?: string;
    }[];
    etiqueta: {
        activo: number;
        fecha: Date;
        usuario?: string;
        etiqueta?: string;
    }[];
    log: string[];
}>;
export interface elementoBitacora extends mongoose.Document {
    activo: Number;
    fecha: Date;
    tipo: [
        {
            tid?: Number;
            fecha?: Date;
            usuario: string;
            activo: Number;
        }
    ];
    estado: [
        {
            oid: string;
            fecha?: Date;
            usuario: string;
            activo: Number;
        }
    ];
    observaciones: [
        {
            observaciones: string;
            fecha?: Date;
            usuario: string;
            activo: Number;
        }
    ];
    etiqueta: [
        {
            etiqueta: string;
            fecha?: Date;
            usuario: string;
            activo: Number;
        }
    ];
}
