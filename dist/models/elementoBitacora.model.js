"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementoBitacoraSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.elementoBitacoraSchema = new mongoose_1.default.Schema({
    activo: {
        type: Number,
        default: 1,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    tipo: [
        {
            tid: Number,
            activo: {
                type: Number,
                required: true,
                default: 1
            },
            fecha: {
                type: Date,
                required: true,
                default: Date.now
            }, usuario: {
                type: String
            }
        }
    ],
    estado: [
        {
            oid: Number,
            activo: {
                type: Number,
                required: true,
                default: 1
            },
            fecha: {
                type: Date,
                required: true,
                default: Date.now
            }, usuario: {
                type: String
            }
        }
    ],
    observaciones: [{
            observaciones: String,
            activo: {
                type: Number,
                required: true,
                default: 1
            },
            fecha: {
                type: Date,
                required: true,
                default: Date.now
            }, usuario: {
                type: String
            }
        }],
    etiqueta: [
        {
            etiqueta: String,
            activo: {
                type: Number,
                required: true,
                default: 1
            },
            fecha: {
                type: Date,
                required: true,
                default: Date.now
            }, usuario: {
                type: String
            }
        }
    ],
    log: [String]
});
//# sourceMappingURL=elementoBitacora.model.js.map