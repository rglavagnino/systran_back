import mongoose, * as mg from "mongoose";
export declare const tipoBitacoraSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    tipo: string;
    activo: number;
    descripcion?: string;
    tid?: number;
}>;
export interface tipobitacora extends mg.Document {
    tipo: string;
    descripcion: string;
    activo: Number;
    tid: Number;
}
