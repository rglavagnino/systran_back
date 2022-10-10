"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.BaseSchema = new mongoose_1.default.Schema({
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
    estado: [{
            activo: Number,
            estado: String,
            fecha: {
                default: Date.now,
                required: true,
                type: Date
            }
        }],
    observaciones: String,
    version: [
        {
            activo: {
                default: 1,
                required: true,
                type: Number,
            },
            version: String,
            nombre_archivo: String,
            numero_registros: Number,
            fecha: {
                default: Date.now,
                required: true,
                type: Date
            },
            dueño: String
        },
    ],
}, { collection: 'base' });
//# sourceMappingURL=base.model.js.map