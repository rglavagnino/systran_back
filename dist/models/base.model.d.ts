import mongoose from "mongoose";
export declare const BaseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    activo: number;
    nombre: string;
    fecha: Date;
    tipo?: string;
    departamento?: string;
    dueño?: string;
}>;
export interface BaseModel extends mongoose.Document {
    activo: Number;
    nombre: String;
    departamento?: String;
    dueño?: String;
    fecha: Date;
    tipo?: String;
}
