import mongoose, { ObjectId } from "mongoose";


export const workingSchema = new mongoose.Schema({


    activo:{
        default:1
        ,required:true
        ,type:Number
    },
    base:{
        required:true
        ,type:mongoose.Schema.Types.ObjectId
    },
    operacion:{
        requiered:true
        ,type:String
    },
    fecha:{
        required:true
        ,type:Date
        ,default:Date.now
    },
    fechaFin:{
        type:Date
    },
    log:[String]


},{collection:'working'})

export interface workModel extends mongoose.Document{
    
    activo?:number
    ,base:ObjectId
    ,operacion:string
    ,fecha?:Date
    ,fechaFin?:Date
    ,log:string[]
}

