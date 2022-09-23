import mongoose,* as mg from "mongoose";


export const tipoBitacoraSchema = new mongoose.Schema({
    tipo : {
        type:String
        ,required : true
    },
    descripcion: String,
    activo :{
        type:Number
        ,required: true
        ,default: 1
    }
    ,tid:Number

}, {collection: 'tipobitacoras'})

export interface tipobitacora extends mg.Document{
    tipo:string
    ,descripcion:string
    ,activo:Number
    ,tid:Number
}