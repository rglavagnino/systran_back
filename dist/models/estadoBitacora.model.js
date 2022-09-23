"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estadoBitacoraSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.estadoBitacoraSchema = new mongoose_1.default.Schema({
    estado: {
        type: String,
        required: true
    },
    activo: {
        type: Number,
        required: true,
        default: 1
    },
    oid: Number
}, { collection: 'estadobitacoras' });
//# sourceMappingURL=estadoBitacora.model.js.map