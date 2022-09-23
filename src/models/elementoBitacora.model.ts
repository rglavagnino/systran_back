import mongoose from "mongoose";

export const elementoBitacoraSchema = new mongoose.Schema({
    activo:{
        type:Number,
        default:1,
        required: true
    },
    fecha:{
        type: Date,
        required: true,
        default: Date.now
    },
    tipo:[
        {
            tid:Number,
            activo:{
                type:Number,
                required:true,
                default:1
            },
            fecha:{
                type: Date,
                required: true,
                default: Date.now
            },usuario:{
                type:String
            }
        }
    ],
    estado:[
        {
            oid:Number,
            activo:{
                type:Number,
                required:true,
                default:1
            },
            fecha:{
                type: Date,
                required: true,
                default: Date.now
            },usuario:{
                type:String
            }
        }
        
    ],
    observaciones:[{
        observaciones:String
        ,
            activo:{
                type:Number,
                required:true,
                default:1
            },
            fecha:{
                type: Date,
                required: true,
                default: Date.now
            },usuario:{
                type:String
            }
    }],
    etiqueta:[
        {
            etiqueta:String,
            
            activo:{
                type:Number,
                required:true,
                default:1
            },
            fecha:{
                type: Date,
                required: true,
                default: Date.now
            },usuario:{
                type:String
            }
        }
    ],
    log:[String]
})

export interface elementoBitacora extends mongoose.Document{
    activo:Number
    ,fecha : Date
    ,tipo:[{
        tid:Number,
        fecha:Date,
        usuario:string,
        activo:Number
    }]
    ,estado:[
        {
            oid:string,
            fecha?:Date,
            usuario:string
            activo:Number
        }
    ],
    observaciones:[
        {
            observaciones:string
            fecha?:Date,
            usuario:string
            activo:Number
        }
    ],
    etiqueta:[
        {
            
            etiqueta:string,
            fecha?:Date,
            usuario:string
            activo:Number
        }
    ]
}