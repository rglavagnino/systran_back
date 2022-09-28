import mongoose from "mongoose"

export const authSchema = new mongoose.Schema({
    activo:{
        type:Number,
        default:1,
        required: true
    },
    usuario: String
    ,nombre:String
    ,apellido:String
    ,fecha:{
        type:Date
        ,default:Date.now
    }
    ,log:String
}, {collection:'login'})

export interface AuthModel extends mongoose.Document{
    activo:Number
    ,usuario:string
    ,nombre:string
    ,apellido:string
}

