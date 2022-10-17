"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catVariableSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.catVariableSchema = new mongoose_1.default.Schema({
    activo: {
        default: 1,
        type: Number,
        required: true
    },
    descripcion: String,
    dueño: String,
    imagen: String,
    variables: [
        { variable: {
                type: mongoose_1.default.Schema.Types.ObjectId
            }, activo: {
                type: Number,
                default: 1
            } }
    ],
    log: [String]
}, { collection: 'categoria_variable' });
//# sourceMappingURL=categoriaVariable.Model.js.map