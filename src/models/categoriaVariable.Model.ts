import { Schema } from "@nestjs/mongoose";
import mongoose,{ObjectId} from "mongoose";
import { variableSchema } from "./variable.model";

export const catVariableSchema = new mongoose.Schema({
    activo:{
        default:1
        ,type:Number
        ,required: true
    }
    ,descripcion:String
    ,dueño:String
    ,imagen:String
    ,variables:[
       { variable:{
            type:mongoose.Schema.Types.ObjectId
            
        },activo:{
            type:Number
            ,default:1 
        }}
    ]
    ,log:[String]
},{collection:'categoria_variable'})


export interface catVariableModel extends mongoose.Document{
    activo?:Number
    ,descripcion:string
    ,dueño:string
    ,variables:
        {
            variable:mongoose.Types.ObjectId
            ,activo:Number
        }[]
    
    ,imagen?:string
    ,log:string[]
}