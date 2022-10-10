import mongoose from 'mongoose';

export const BaseSchema = new mongoose.Schema(
  {
    activo: {
      default: 1,
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    tipo: String,
    departamento: String,
    dueño: String,
    fecha: {
      type: Date,
      required: true,
      default: Date.now,
    },
    log: [String],
    estado:[{
        activo:Number
        ,estado:String
        ,fecha:{
            default:Date.now
            ,required:true
            ,type:Date
        }
    }]
    ,observaciones: String,
    version: [
      {
        activo: {
          default: 1,
          required: true,
          type: Number,
        },
        version:String,
        nombre_archivo:String,
        numero_registros:Number
        ,fecha:{
            default:Date.now
            ,required:true
            ,type:Date
        },
        dueño:String
      },
    ],
  },
  { collection: 'base' },
); //schema

export interface BaseModel extends mongoose.Document {
  activo: Number;
  nombre: String;
  departamento?: String;
  dueño?: String;
  fecha: Date;
  tipo?: String;
  log?: String[];
  observacion?:String;
  estado?:any[];
  version?:any[]
}
