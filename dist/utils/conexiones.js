"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerConexiones = void 0;
function obtenerConexiones(tipo) {
    if (tipo === 1)
        return 'mongodb://admin:lapicero2@172.18.231.1:9032/systran?authSource=admin&readPreference=primary&directConnection=true&ssl=false';
}
exports.obtenerConexiones = obtenerConexiones;
//# sourceMappingURL=conexiones.js.map