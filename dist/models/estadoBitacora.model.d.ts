import mongoose, * as mg from "mongoose";
export declare const estadoBitacoraSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    estado: string;
    activo: number;
    oid?: number;
}>;
export interface estadobitacora extends mg.Document {
    estado: string;
    activo: Number;
    oid: Number;
}
