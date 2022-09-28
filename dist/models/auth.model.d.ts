import mongoose from "mongoose";
export declare const authSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    activo: number;
    fecha: Date;
    usuario?: string;
    nombre?: string;
    apellido?: string;
    log?: string;
}>;
export interface AuthModel extends mongoose.Document {
    activo: Number;
    usuario: string;
    nombre: string;
    apellido: string;
}
