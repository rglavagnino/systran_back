"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salidaYLog = exports.loggerId = exports.logger = exports.obtenerTipo = exports.crearSalida = void 0;
const version_1 = require("./version");
function crearSalida(mensaje, tipo, debug, datos) {
    let nuevaSalida;
    nuevaSalida = {
        mensaje, tipo, debug, datos
    };
    return nuevaSalida;
}
exports.crearSalida = crearSalida;
function obtenerTipo(tipo) {
    if (tipo === 1)
        return 'Info';
    else if (tipo === 2)
        return 'Exito';
    else if (tipo === 3)
        return 'Error';
    else
        return 'NA';
}
exports.obtenerTipo = obtenerTipo;
function logger(msg) {
    const ahora = new Date();
    const ver = (0, version_1.obtenerVersion)();
    console.log('[' + ver.version + ']' + ' ' + ahora.toLocaleString() + ' - ' + msg);
}
exports.logger = logger;
function loggerId(usuario, msg, idFuncion) {
    const ahora = new Date();
    const ver = (0, version_1.obtenerVersion)();
    console.log('[' + ver.version + ']' + ' [' + usuario + '] ' + ahora.toLocaleString() + ' - ' + idFuncion.toString() + ' - ' + msg);
}
exports.loggerId = loggerId;
function salidaYLog(usuario, idFuncion, msg, tipoRes, datos) {
    loggerId(usuario, msg, idFuncion);
    const salida = crearSalida(msg, tipoRes, '', datos);
    return salida;
}
exports.salidaYLog = salidaYLog;
//# sourceMappingURL=salida.js.map