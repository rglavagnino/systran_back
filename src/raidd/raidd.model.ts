import mongoose from "mongoose"

export interface raidd extends mongoose.Document {
    Fecha:string
    ,Hora:string
    ,RAIDD: string
    ,Estado:string
    ,Observaciones?:string
    ,Etiquetas?:string
}