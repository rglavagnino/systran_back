"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.authSchema = new mongoose_1.default.Schema({
    activo: {
        type: Number,
        default: 1,
        required: true
    },
    usuario: String,
    nombre: String,
    apellido: String,
    fecha: {
        type: Date,
        default: Date.now
    },
    log: String
}, { collection: 'login' });
//# sourceMappingURL=auth.model.js.map