"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salidaYLog = exports.loggerId = exports.logger = exports.obtenerTipo = exports.crearSalida = exports.formarLog = exports.obtenerStatusHttp = void 0;
const version_1 = require("./version");
const common_1 = require("@nestjs/common");
function obtenerStatusHttp(resul) {
    let status;
    if (!resul)
        return common_1.HttpStatus.BAD_REQUEST;
    if (resul.tipo === 'Info' || resul.tipo === 'Exito')
        status = common_1.HttpStatus.OK;
    else
        status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    return status;
}
exports.obtenerStatusHttp = obtenerStatusHttp;
function formarLog(usuario, funcion, operacion, msg, body) {
    const ahora = new Date();
    const sep = '|';
    const logListo = usuario + sep + funcion + sep + operacion + sep + msg + JSON.stringify(body);
}
exports.formarLog = formarLog;
function crearSalida(mensaje, tipo, debug, datos) {
    let nuevaSalida;
    nuevaSalida = {
        mensaje,
        tipo,
        debug,
        datos,
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
    console.log('[' +
        ver.version +
        ']' +
        ' [' +
        usuario +
        '] ' +
        ahora.toLocaleString() +
        ' - ' +
        idFuncion.toString() +
        ' - ' +
        msg);
}
exports.loggerId = loggerId;
function salidaYLog(usuario, idFuncion, msg, tipoRes, datos) {
    loggerId(usuario, msg, idFuncion);
    const salida = crearSalida(msg, tipoRes, '', datos);
    return salida;
}
exports.salidaYLog = salidaYLog;
//# sourceMappingURL=salida.js.map