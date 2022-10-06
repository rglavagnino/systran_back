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
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const salida_1 = require("../utils/salida");
const mongoose_2 = __importStar(require("mongoose"));
const bson_1 = require("bson");
let BaseService = class BaseService {
    constructor(baseModel) {
        this.baseModel = baseModel;
    }
    async insertarBase(nombreBase, departamento, dueño, tipo, usuario) {
        const idFuncion = 3001;
        const funcionDescr = 'CREACION BASE DE BASE DE DATOS';
        (0, salida_1.loggerId)(usuario, 'Intentando ingresar una nueva base de datos: ' + nombreBase, idFuncion);
        let banFaltante = '';
        if (!nombreBase) {
            banFaltante = 'Nombre de la base';
        }
        if (!departamento) {
            banFaltante = 'Departamento origen';
        }
        if (!dueño) {
            banFaltante = 'Persona que entrego la base de datos';
        }
        if (!tipo) {
            banFaltante = 'El tipo de base de datos';
        }
        if (!usuario) {
            banFaltante = 'El usuario de la operacion';
        }
        if (banFaltante !== '') {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede insertar la base de datos falta: ' + banFaltante, (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando si existe una base de datos con este nombre', idFuncion);
        const baseEncontrada = await this.baseModel.findOne({
            activo: 1,
            nombre: nombreBase,
            departamento: departamento,
        });
        if (baseEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'La base de datos ' + baseEncontrada.nombre + ' ya existe', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Insertando la base de datos', idFuncion);
        let nuevaBase = new this.baseModel({
            nombre: nombreBase,
            departamento: departamento,
            dueño: dueño,
            tipo: tipo,
        });
        const log = (0, salida_1.formarLog)(usuario, idFuncion, funcionDescr, 'Se esta creando una nueva base de datos', nuevaBase);
        let nuevoLog = [];
        nuevoLog.push(log);
        nuevaBase.log = nuevoLog;
        (0, salida_1.loggerId)(usuario, 'Creando la base: ' + nuevaBase.nombre, idFuncion);
        nuevaBase = await nuevaBase.save();
        if (!nuevaBase) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error al guardar la base', (0, salida_1.obtenerTipo)(3));
        }
        let sal = [];
        sal.push(nuevaBase);
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en guardar la base', (0, salida_1.obtenerTipo)(2), sal);
    }
    async eliminarBase(idBase, usuario) {
        const idFuncion = 3002;
        const funDescr = 'ELIMINACION BASE DE DATOS';
        (0, salida_1.loggerId)(usuario, 'Intentando eliminar una base', idFuncion);
        let banFaltante = '';
        if (!idBase) {
            banFaltante = 'La base';
        }
        if (mongoose_2.default.isValidObjectId(idBase) == false) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, el formato de la base no es reconocido ' + idBase, (0, salida_1.obtenerTipo)(3));
        }
        if (!usuario) {
            banFaltante = 'Usuario que va eliminar la base';
        }
        if (banFaltante !== '') {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede eliminar, ingresar: ' + banFaltante, (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando la base: ' + idBase, idFuncion);
        let baseEncontrada = await this.baseModel.findOne({
            _id: new bson_1.ObjectID(idBase)
        });
        if (!baseEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se encontro la base', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Base encontrada ' + baseEncontrada.nombre + ' empezando a eliminar', idFuncion);
        const log = (0, salida_1.formarLog)(usuario, idFuncion, funDescr, 'Se esta eliminando una funcion', { "_id": new bson_1.ObjectID(idBase) });
        baseEncontrada.activo = 0;
        baseEncontrada.log.push(log);
        baseEncontrada = await baseEncontrada.save();
        if (!baseEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se pudo eliminar la base', (0, salida_1.obtenerTipo)(3));
        }
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en eliminar la base ' + baseEncontrada.nombre, (0, salida_1.obtenerTipo)(2));
    }
    async actualizarBase(idBase, usuario, nombre, departamento, tipo, dueño) {
        const idFuncion = 3003;
        const funDescr = 'ACTUALIZACION BASE DE DATOS';
        (0, salida_1.loggerId)(usuario, 'Intentando actualizar la base: ' + idBase, idFuncion);
        let banFaltante = '';
        if (!idBase) {
            banFaltante = 'Base a actualizar';
        }
        if (!usuario) {
            banFaltante = 'Usuario que esta intentando actualizar ';
        }
        if (banFaltante !== '') {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, no se puede actualizar la base: Falta ' + banFaltante, (0, salida_1.obtenerTipo)(3));
        }
        if (mongoose_2.default.isValidObjectId(idBase) == false) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error, el formato de la base no es reconocido ' + idBase, (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Buscando la base ' + idBase, idFuncion);
        let baseEncontrada = await this.baseModel.findOne({
            _id: new bson_1.ObjectID(idBase)
        });
        if (!baseEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede actualizar la base', (0, salida_1.obtenerTipo)(3));
        }
        (0, salida_1.loggerId)(usuario, 'Base encontrada: ' + baseEncontrada.nombre, idFuncion);
        if (nombre) {
            baseEncontrada.nombre = nombre;
        }
        if (departamento) {
            baseEncontrada.departamento = departamento;
        }
        if (tipo) {
            baseEncontrada.tipo = tipo;
        }
        if (dueño) {
            baseEncontrada.dueño = dueño;
        }
        (0, salida_1.loggerId)(usuario, 'Guardando los cambios de la base ....', idFuncion);
        const dalog = {
            idBase, usuario, nombre, departamento, tipo, dueño
        };
        const log = (0, salida_1.formarLog)(usuario, idFuncion, funDescr, 'Se esta actualizando la base', dalog);
        baseEncontrada.log.push(log);
        baseEncontrada = await baseEncontrada.save();
        if (!baseEncontrada) {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede guardar los cambios de la base', (0, salida_1.obtenerTipo)(3));
        }
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en guardar los cambios en la base ' + baseEncontrada.nombre, (0, salida_1.obtenerTipo)(1));
    }
    async obtenerBasesActiva(usuario) {
        const idFuncion = 3004;
        (0, salida_1.loggerId)(usuario, 'Intentando obtener las bases actias', idFuncion);
        if (!usuario) {
            (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede obtener los datos debido a que falta el usuario', (0, salida_1.obtenerTipo)(3));
        }
        const query = { activo: 1 };
        const resul = await this.ejecutarConsultaBase(query, usuario);
        if (!resul) {
            (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error al obtener los datos ', (0, salida_1.obtenerTipo)(3));
        }
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en obtener los datos', (0, salida_1.obtenerTipo)(1), resul);
    }
    async obtenerBasesPorId(idBase, usuario) {
        const idFuncion = 3006;
        (0, salida_1.loggerId)(usuario, 'Intentando obtener las bases por id: ' + idBase, idFuncion);
        if (!usuario) {
            (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede obtener los datos debido a que falta el usuario', (0, salida_1.obtenerTipo)(3));
        }
        const query = { activo: 1, _id: new bson_1.ObjectID(idBase) };
        const resul = await this.ejecutarConsultaBase(query, usuario);
        if (!resul) {
            (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error al obtener los datos ', (0, salida_1.obtenerTipo)(3));
        }
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en obtener los datos', (0, salida_1.obtenerTipo)(1), resul);
    }
    async ejecutarConsultaBase(query, usuario) {
        const idFuncion = 3005;
        try {
            (0, salida_1.loggerId)(usuario, 'Ejecutando consulta ' + JSON.stringify(query), idFuncion);
            let encontrado = await this.baseModel.find(query);
            if (!encontrado) {
                (0, salida_1.loggerId)(usuario, 'Error al obtener los datos ', idFuncion);
                return null;
            }
            const lon = encontrado.length;
            (0, salida_1.loggerId)(usuario, 'Se encontraron ' + lon + ' registros', idFuncion);
            return encontrado;
        }
        catch (exception) {
            (0, salida_1.loggerId)(usuario, 'Excepcion al obtener los datos ' + exception, idFuncion);
            return null;
        }
    }
};
BaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('BaseSchema')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map