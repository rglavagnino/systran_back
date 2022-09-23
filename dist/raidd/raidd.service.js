"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaiddService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const salida_1 = require("../utils/salida");
const raid_query_1 = require("./raid.query");
let RaiddService = class RaiddService {
    constructor(elementoBitacoraModel, estadoBitacoraModel) {
        this.elementoBitacoraModel = elementoBitacoraModel;
        this.estadoBitacoraModel = estadoBitacoraModel;
    }
    separarEtiquetas(listadoEtiqueta) {
        (0, salida_1.logger)('1003 - Separando las etiquetas ' + listadoEtiqueta);
        let mensaje = { tipo: 0, mensaje: '', dataUnico: 1, dataArreglo: [] };
        if (listadoEtiqueta) {
            const sep = listadoEtiqueta.split(",");
            mensaje.tipo = 1;
            mensaje.dataArreglo = sep;
        }
        else {
            mensaje.tipo = 0;
        }
        return mensaje;
    }
    async buscarEstadoMasNuevo() {
        let resul = { tipo: 0, mensaje: '', dataUnico: 1, dataArreglo: [] };
        (0, salida_1.logger)('1001 - Buscando el estado mas nuevo');
        const primerEstado = await this.estadoBitacoraModel.findOne({ activo: 1 }, { _id: 0, __v: 0, activo: 0 }, { oid: 1 }).catch((err => {
            resul.tipo = 0;
            resul.mensaje = err;
            (0, salida_1.logger)('1001 - No se puede obtener el primer estado');
        }));
        if (primerEstado) {
            const resultado = primerEstado;
            resul.tipo = 1;
            resul.dataUnico = resultado.oid;
            (0, salida_1.logger)('1001 - Primer estado encontrado ' + resultado.estado);
        }
        else {
            resul.tipo = 0;
            resul.mensaje = 'Ningún estado encontrado';
            (0, salida_1.logger)('1001 - No hay ningun primer estado');
        }
        return resul;
    }
    async actualizarObservacion(id, obsNueva, usuario) {
        const idFuncion = 1007;
        if (!usuario) {
            (0, salida_1.loggerId)(usuario, 'Actualización fallida de etiqueta, falta el usuario creador ', idFuncion);
            const sal = (0, salida_1.crearSalida)('Actualización fallida de etiqueta, falta el usuario creador ', (0, salida_1.obtenerTipo)(3), 'Falta el usuario', []);
            return sal;
        }
        if (!obsNueva) {
            const msg = 'Falla la Actualización debido a que no se tiene una observación valida';
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        if (mongoose_2.default.isValidObjectId(id) == false) {
            (0, salida_1.loggerId)(usuario, 'Falla la actualización debido a que no se tiene un id valido', idFuncion);
            const salida = (0, salida_1.crearSalida)('Falla la actualización debido a que no se tiene un id valido', (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        (0, salida_1.loggerId)(usuario, 'Actualización la etiqueta ' + this.eliminarEtiqueta + ' ' + id, idFuncion);
        (0, salida_1.loggerId)(usuario, 'Buscando el elemento de la bitcora', idFuncion);
        let elemento = await this.elementoBitacoraModel.findById(id);
        if (!elemento) {
            const msg = 'elemento ' + id + ' no encontrado';
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        else {
            let msg = 'Obteniendo las observación de ' + id;
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            let obs = elemento.observaciones;
            if (!obs) {
                msg = 'No tiene observación ' + id;
                (0, salida_1.loggerId)(usuario, msg, idFuncion);
            }
            (0, salida_1.loggerId)(usuario, 'Buscando la observación activa', idFuncion);
            let el = obs.findIndex((x) => {
                return x.activo === 1;
            });
            if (el === -1) {
                msg = 'observación activa no encontrada';
                (0, salida_1.loggerId)(usuario, msg, idFuncion);
            }
            let obsEncontrada = obs[el];
            (0, salida_1.loggerId)(usuario, 'Observacion encontrada ' + obsEncontrada.observaciones, idFuncion);
            obsEncontrada.activo = 0;
            const newObs = {
                observaciones: obsNueva,
                usuario: usuario,
                activo: 1
            };
            elemento.observaciones.push(newObs);
            (0, salida_1.loggerId)(usuario, 'Intentando de guardar en la BDD', idFuncion);
            await elemento.save().catch((Err) => {
                msg = 'No se puede actualizar la observación ' + obsNueva + ' Error en guardar en la base de datos';
                (0, salida_1.loggerId)(usuario, msg + ' ' + Err.toString(), idFuncion);
                const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
                return salida;
            });
            msg = 'Observacion actualizada ';
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(2), '', []);
            return salida;
        }
    }
    async insertarElemento(observaciones, tipo, etiqueta, usuario) {
        if (!usuario) {
            const sal = (0, salida_1.crearSalida)('Creacion fallida de elemento bitacora, falta el usuario creador ', (0, salida_1.obtenerTipo)(3), 'Falta el usuario', []);
            (0, salida_1.logger)('1002 - Creacion fallida de elemento bitacora falta el usuario');
            return sal;
        }
        (0, salida_1.logger)('1002 - Ingresando nuevo tipo de bitacora ' + tipo);
        const newObs = {
            observaciones: observaciones,
            usuario: usuario,
            activo: 1
        };
        const newTipo = {
            tid: tipo, usuario, activo: 1, fecha: undefined
        };
        const elementoNuevo = new this.elementoBitacoraModel({
            activo: 1,
            usuario
        });
        const msgEstadoInsertar = await this.buscarEstadoMasNuevo();
        if (msgEstadoInsertar.tipo === 0) {
            const sal = (0, salida_1.crearSalida)('Creacion fallida de elemento bitacora ' + tipo, (0, salida_1.obtenerTipo)(3), msgEstadoInsertar.mensaje, []);
            (0, salida_1.logger)('1002 - Creacion fallida de elemento bitacora ' + tipo);
            return sal;
        }
        const estadoInsertar = msgEstadoInsertar.dataUnico;
        const estadoNuevo = {
            oid: estadoInsertar,
            usuario, activo: 1
        };
        elementoNuevo.estado.push(estadoNuevo);
        if (observaciones)
            console.log(newObs);
        elementoNuevo.observaciones.push(newObs);
        if (tipo)
            elementoNuevo.tipo.push(newTipo);
        else {
            const sal = (0, salida_1.crearSalida)('Creacion fallida de elemento bitacora, falta el tipo ', (0, salida_1.obtenerTipo)(3), 'Falta el tipo', []);
            (0, salida_1.logger)('1002 - Creacion fallida de elemento bitacora falta el tipo');
            return sal;
        }
        if (etiqueta) {
            let menEtiqueta = this.separarEtiquetas(etiqueta);
            if (menEtiqueta.tipo == 1) {
                const etiquetas = menEtiqueta.dataArreglo;
                etiquetas.forEach((et) => {
                    const etiquetaNueva = {
                        etiqueta: et, usuario, activo: 1
                    };
                    elementoNuevo.etiqueta.push(etiquetaNueva);
                });
            }
        }
        await elementoNuevo.save().catch((err) => {
            const sal = (0, salida_1.crearSalida)('Creacion fallida de elemento bitacora ' + tipo, (0, salida_1.obtenerTipo)(3), err, []);
            (0, salida_1.logger)('1002 - Creacion fallida de elemento bitacora ' + tipo);
            return sal;
        });
        let resul = [];
        resul.push(elementoNuevo);
        const sal = (0, salida_1.crearSalida)('Creacion exitosa de elemento bitacora ' + tipo, (0, salida_1.obtenerTipo)(2), '', resul);
        (0, salida_1.logger)('1002 - Creacion exitosa de elemento bitacora ' + tipo);
        return sal;
    }
    async obtenerTodosElementosBitacora(usuario) {
        const idFuncion = 1004;
        (0, salida_1.loggerId)(usuario, 'obteniendo todos los elementos de la bitacora', idFuncion);
        const query = raid_query_1.queryObtenerBitacora;
        const resul = await this.elementoBitacoraModel.aggregate(query);
        const arr = resul.map(ra => {
            return {
                Fecha: ra.Fecha,
                Hora: ra.Hora,
                RAIDD: ra.RAIDD,
                Observaciones: ra.Observaciones,
                Etiquetas: ra.Etiquetas,
                id: ra._id
            };
        });
        (0, salida_1.loggerId)(usuario, 'Se obtuvieron ' + arr.length.toString() + ' resultados', idFuncion);
        const salida = (0, salida_1.crearSalida)('', (0, salida_1.obtenerTipo)(2), '', arr);
        return salida;
    }
    async eliminarEtiqueta(id, etiquetaEliminar, usuario) {
        const idFuncion = 1005;
        if (!usuario) {
            (0, salida_1.loggerId)(usuario, 'Eliminacion fallida de etiqueta, falta el usuario creador ', idFuncion);
            const sal = (0, salida_1.crearSalida)('Eliminacion fallida de etiqueta, falta el usuario creador ', (0, salida_1.obtenerTipo)(3), 'Falta el usuario', []);
            return sal;
        }
        if (!etiquetaEliminar) {
            const msg = 'Falla la eliminacion debido a que no se tiene una etiqueta valida';
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        if (mongoose_2.default.isValidObjectId(id) == false) {
            (0, salida_1.logger)('1005 - Falla la eliminacion debido a que no se tiene un id valido');
            const salida = (0, salida_1.crearSalida)('Falla la eliminacion debido a que no se tiene un id valido', (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        (0, salida_1.logger)('1005 - Eliminando la etiqueta ' + this.eliminarEtiqueta + ' ' + id);
        (0, salida_1.logger)('1005 - Buscando el elemento de la bitcora');
        let elemento = await this.elementoBitacoraModel.findById(id);
        if (!elemento) {
            const msg = 'elemento ' + id + ' no encontrado';
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        else {
            let msg = 'Obteniendo las etiquetas de ' + id;
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            let etiquetas = elemento.etiqueta;
            if (!etiquetas) {
                msg = 'No tiene etiqueta ' + id;
                (0, salida_1.loggerId)(usuario, msg, idFuncion);
            }
            (0, salida_1.loggerId)(usuario, 'Buscando la etiqueta ' + etiquetaEliminar, idFuncion);
            let el = etiquetas.findIndex((x) => {
                return x.etiqueta === etiquetaEliminar && x.activo === 1;
            });
            if (el === -1) {
                msg = 'Etiqueta no encontrada';
                (0, salida_1.loggerId)(usuario, msg, 1005);
                return (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(1), '', []);
            }
            else {
                let etiquetaEncontrada = etiquetas[el];
                etiquetaEncontrada.activo = 0;
                await elemento.save().catch((Err) => {
                    msg = 'No se puede eliminar la etiqueta ' + etiquetaEliminar + ' Error en guardar en la base de datos';
                    (0, salida_1.loggerId)(usuario, msg + ' ' + Err.toString(), idFuncion);
                    const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
                    return salida;
                });
                msg = 'Etiqueta ' + etiquetaEliminar + ' eliminada';
                const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(2), '', []);
                return salida;
            }
        }
    }
    async insertarEtiqueta(id, nuevaEtiqueta, usuario) {
        const idFuncion = 1006;
        if (!usuario) {
            (0, salida_1.loggerId)(usuario, 'Agregación fallida de etiqueta, falta el usuario creador ', idFuncion);
            const sal = (0, salida_1.crearSalida)('Agregación fallida de etiqueta, falta el usuario creador ', (0, salida_1.obtenerTipo)(3), 'Falta el usuario', []);
            return sal;
        }
        if (!nuevaEtiqueta) {
            const msg = 'Falla la eliminacion debido a que no se tiene una etiqueta valida';
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        (0, salida_1.loggerId)(usuario, 'Agregando la etiqueta ' + nuevaEtiqueta + ' en el tarea ' + id, idFuncion);
        if (mongoose_2.default.isValidObjectId(id) == false) {
            (0, salida_1.loggerId)(usuario, 'Falla la eliminacion debido a que no se tiene un id valido', idFuncion);
            const salida = (0, salida_1.crearSalida)('Falla la eliminacion debido a que no se tiene un id valido', (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        (0, salida_1.loggerId)(usuario, 'Buscando el elemento de la bitcora', idFuncion);
        let elemento = await this.elementoBitacoraModel.findById(id);
        if (!elemento) {
            const msg = 'elemento ' + id + ' no encontrado';
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
            return salida;
        }
        else {
            let msg = 'Obteniendo las etiquetas de ' + id;
            (0, salida_1.loggerId)(usuario, msg, idFuncion);
            let etiquetas = elemento.etiqueta;
            if (!etiquetas) {
                msg = 'No tiene etiqueta ' + id;
                (0, salida_1.loggerId)(usuario, msg, idFuncion);
            }
            (0, salida_1.loggerId)(usuario, 'Buscando la etiqueta ' + nuevaEtiqueta + ' para revisar si existe', idFuncion);
            let el = etiquetas.findIndex((x) => {
                return x.etiqueta === nuevaEtiqueta && x.activo === 1;
            });
            if (el > -1) {
                msg = 'Etiqueta ya existe, no se puede agregar';
                (0, salida_1.loggerId)(usuario, msg, idFuncion);
                return (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(1), '', []);
            }
            else {
                let nueva = {
                    etiqueta: nuevaEtiqueta,
                    activo: 1,
                    usuario: usuario
                };
                elemento.etiqueta.push(nueva);
                await elemento.save().catch((Err) => {
                    msg = 'No se puede agregar la etiqueta ' + nuevaEtiqueta + ' Error en guardar en la base de datos';
                    (0, salida_1.loggerId)(usuario, msg + ' ' + Err.toString(), idFuncion);
                    const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(3), '', []);
                    return salida;
                });
                msg = 'Etiqueta ' + nuevaEtiqueta + ' agregada';
                const salida = (0, salida_1.crearSalida)(msg, (0, salida_1.obtenerTipo)(2), '', []);
                return salida;
            }
        }
    }
};
RaiddService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('ElementoBitacora')),
    __param(1, (0, mongoose_1.InjectModel)('EstadoBitacora')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RaiddService);
exports.RaiddService = RaiddService;
//# sourceMappingURL=raidd.service.js.map