import mongoose from "mongoose";
export declare const catVariableSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    activo: number;
    variables: {
        activo: number;
        variable?: mongoose.Types.ObjectId;
    }[];
    log: string[];
    descripcion?: string;
    dueño?: string;
    imagen?: string;
}>;
export interface catVariableModel extends mongoose.Document {
    activo?: Number;
    descripcion: string;
    dueño: string;
    variables: {
        variable: mongoose.Types.ObjectId;
        activo: Number;
    }[];
    imagen?: string;
    log: string[];
}
