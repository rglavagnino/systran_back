import mongoose,* as mg from "mongoose";


export const estadoBitacoraSchema = new mongoose.Schema({
    estado : {
        type:String
        ,required : true
    },
     activo :{
        type:Number
        ,required: true
        ,default: 1
    }
    ,oid:Number

}, {collection: 'estadobitacoras'})

export interface estadobitacora extends mg.Document{
    estado:string
    ,activo:Number
    ,oid:Number
}