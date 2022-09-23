"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoBitacoraSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.tipoBitacoraSchema = new mongoose_1.default.Schema({
    tipo: {
        type: String,
        required: true
    },
    descripcion: String,
    activo: {
        type: Number,
        required: true,
        default: 1
    },
    tid: Number
}, { collection: 'tipobitacoras' });
//# sourceMappingURL=tipoBitacora.model.js.map