"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiLogger = void 0;
const salida_1 = require("./salida");
class MiLogger {
    constructor(usuario, idFuncion, descrFuncion) {
        this.usuario = usuario;
        this.idFuncion = idFuncion;
        this.descrFuncion = descrFuncion;
    }
    crearLogBdd(msg, body) {
        return (0, salida_1.formarLog)(this.usuario, this.idFuncion, this.descrFuncion, msg, body);
    }
    crearLog(msg) {
        return (0, salida_1.loggerId)(this.usuario, msg, this.idFuncion);
    }
    crearLogYSalida(msg, tipoMsg, body) {
        return (0, salida_1.salidaYLog)(this.usuario, this.idFuncion, msg, (0, salida_1.obtenerTipo)(tipoMsg), body);
    }
}
exports.MiLogger = MiLogger;
//# sourceMappingURL=logs.js.map