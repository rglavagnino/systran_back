import { Schema } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";


export const variableSchema = new mongoose.Schema({
    activo:{
        default:1,
        required:true,
        type:Number
    },
    //el nombre de la variable es la variable que se tiene en el excel
    nombre_variable: { 
        type:String
        ,required:true
    },

    //variable normalizada para facil manipulacion
    nombre_normalizado:{
        type:String
    }

    //codigo que se le asigna a la variable
    //el codigo es [depto][base][correlativo]
    //ejemplo DTSI-05
    ,codigo_variable:String
    //si se desecha ya que es una variable que es inutil
    ,desechado:{
        type:Number,
        default:0,
        required:true
    }
    //marco de que sirve esta variables
    ,descripcion:String
    //la base la cual pertenece la data
    ,base:{
        type:mongoose.Schema.Types.ObjectId
        ,requiered:true
    }
    , log:[String]
}, {collection:'variable'})

export interface VariableModel extends mongoose.Document{
    activo?:number
    ,nombre_variable:string
    ,nombre_normalizado:string
    ,codigo_variable:string
    ,desechado:number
    ,descripcion:string
    ,base:ObjectId
    ,log:string[]
}
