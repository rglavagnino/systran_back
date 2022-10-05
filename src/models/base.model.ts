import mongoose from "mongoose"

export const BaseSchema = new mongoose.Schema({
    activo:{
        default:1
        ,type:Number
        ,required:true
    },
    nombre:{
        type:String
        ,required:true
    },
    tipo:String,
    departamento:String,
    dueño:String,
    fecha:{
        type:Date,
        required:true
        ,default:Date.now
    }
    
}, {collection:'base'})//schema


export interface BaseModel extends mongoose.Document{
    activo:Number
    ,nombre:String
    ,departamento?:String
    ,dueño?:String
    ,fecha:Date
    ,tipo?:String
}