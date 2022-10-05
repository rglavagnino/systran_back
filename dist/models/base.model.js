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
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: String,
    departamento: String,
    dueño: String,
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { collection: 'base' });
//# sourceMappingURL=base.model.js.map