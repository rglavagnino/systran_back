"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variableSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.variableSchema = new mongoose_1.default.Schema({
    activo: {
        default: 1,
        required: true,
        type: Number
    },
    nombre_variable: {
        type: String,
        required: true
    },
    nombre_normalizado: {
        type: String
    },
    codigo_variable: String,
    desechado: {
        type: Number,
        default: 0,
        required: true
    },
    descripcion: String,
    base: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        requiered: true
    },
    log: [String],
    fecha: {
        default: Date.now,
        required: true,
        type: Date
    }
}, { collection: 'variable' });
//# sourceMappingURL=variable.model.js.map