"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workingSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.workingSchema = new mongoose_1.default.Schema({
    activo: {
        default: 1,
        required: true,
        type: Number
    },
    base: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId
    },
    operacion: {
        requiered: true,
        type: String
    },
    fecha: {
        required: true,
        type: Date,
        default: Date.now
    },
    fechaFin: {
        type: Date
    },
    log: [String]
}, { collection: 'working' });
//# sourceMappingURL=working.model.js.map