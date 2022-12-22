import mongoose, { ObjectId } from "mongoose";
export declare const workingSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    activo: number;
    base: mongoose.Types.ObjectId;
    fecha: Date;
    log: string[];
    operacion?: string;
    fechaFin?: Date;
}>;
export interface workModel extends mongoose.Document {
    activo?: number;
    base: ObjectId;
    operacion: string;
    fecha?: Date;
    fechaFin?: Date;
    log: string[];
}
