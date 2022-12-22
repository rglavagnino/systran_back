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
exports.CatVariableService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const salida_1 = require("../utils/salida");
const bson_1 = require("bson");
const logs_1 = require("../utils/logs");
let CatVariableService = class CatVariableService {
    constructor(catVariableModel) {
        this.catVariableModel = catVariableModel;
    }
    async obtenerCategoria(usuario) {
        const idFuncion = 5001;
        const funDescr = 'OBTENER CATEGORIA';
        let banderError = '';
        if (!usuario)
            banderError = 'Falta el usuario que esta generando las variables';
        if (banderError)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, banderError, (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Obteniendo todas la categorias activas', idFuncion);
        let catEncontradas = await this.catVariableModel.aggregate([
            {
                $match: {
                    $and: [
                        { activo: 1 }
                    ]
                }
            },
            {
                $project: {
                    activo: 1,
                    descripcion: 1,
                    dueño: 1
                }
            }
        ]);
        if (!catEncontradas)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error al obtener los datos', (0, salida_1.obtenerTipo)(3));
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Se han encontrado ' + catEncontradas.length + ' categorias de variables', (0, salida_1.obtenerTipo)(2), catEncontradas);
    }
    async insertarCategoria(descr, dueño, usuario, imagen, variables) {
        const idFuncion = 5002;
        const funDescr = 'INSERTAR CATEGORIA';
        (0, salida_1.loggerId)(usuario, 'Insertando una categoria', idFuncion);
        let banderError = '';
        if (!descr)
            banderError = 'descripcion de la categoria';
        if (!dueño)
            banderError = 'usuario que quiere crear la categoria';
        if (banderError !== '')
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede crear la categoria falta: ' + banderError, (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Revisando si existe alguna categoria con el mismo nombre', idFuncion);
        let catEncontradas = await this.catVariableModel.find({
            activo: 1,
            descripcion: descr,
        });
        if (!catEncontradas)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Error al obtener de la base de datos', (0, salida_1.obtenerTipo)(3));
        if (catEncontradas.length > 0)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede crear una categoria con el mismo nombre de una registrada anteriormente', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'No se encuentra ninguna, empezando a crear la categoria', idFuncion);
        let nuevaCat = new this.catVariableModel({
            descripcion: descr,
            dueño: dueño,
            imagen: imagen,
        });
        const log = [];
        log.push((0, salida_1.formarLog)(dueño, idFuncion, funDescr, 'Creacion de la categoria', nuevaCat));
        if (variables) {
            if (variables.length > 0) {
                let varInc = [];
                variables.forEach((element) => {
                    varInc.push({
                        variable: new bson_1.ObjectID(element),
                        activo: 1,
                    });
                    log.push((0, salida_1.formarLog)(dueño, idFuncion, 'INSERTAR VARIABLE', 'Ingreso de una variable a una categoria', element));
                });
                nuevaCat.variables = varInc;
            }
        }
        nuevaCat.log = log;
        nuevaCat = await nuevaCat.save();
        if (!nuevaCat)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede guardar en la base de datos', (0, salida_1.obtenerTipo)(3));
        let sal = [];
        sal.push(nuevaCat);
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en guardar la categoria', (0, salida_1.obtenerTipo)(2), sal);
    }
    async eliminarCategoria(cat, usuario) {
        const idFuncion = 5003;
        const funDescr = 'ELIMINAR CATEGORIA';
        (0, salida_1.loggerId)(usuario, 'Eliminando una categoria', idFuncion);
        if (!cat)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede eliminar la categoria, falta la categoria a eliminar', (0, salida_1.obtenerTipo)(3));
        if (!(0, mongoose_2.isValidObjectId)(cat))
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede eliminar la categoria, id invalido', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Buscando la categoria ' + cat, idFuncion);
        let catEncontrada = await this.catVariableModel.findOne({
            activo: 1,
            _id: new bson_1.ObjectID(cat),
        });
        if (!catEncontrada)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No es posible buscar en la base de datos', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Categoria encontrada: ' +
            catEncontrada.descripcion +
            ', empezando a eliminar', idFuncion);
        catEncontrada.log.push((0, salida_1.formarLog)(usuario, idFuncion, funDescr, '', cat));
        catEncontrada.activo = 0;
        catEncontrada = await catEncontrada.save();
        if (!catEncontrada)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No es posible guardar en la base de datos', (0, salida_1.obtenerTipo)(3));
        let salida = [];
        salida.push(catEncontrada);
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Categoria eliminada con exito', (0, salida_1.obtenerTipo)(2), salida);
    }
    async insertarVariables(usuario, cat, variables) {
        const idFuncion = 5004;
        const funDescr = 'INSERTAR VARIABLE';
        (0, salida_1.loggerId)(usuario, 'Empezando a agregar variables a la categoria ' + cat, idFuncion);
        if (!cat)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede agregar, no tiene categoria', (0, salida_1.obtenerTipo)(3));
        if (!(0, mongoose_2.isValidObjectId)(cat))
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'El id de la categoria no es valido', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Buscando en la base de datos.', idFuncion);
        let catEncontrada = await this.catVariableModel.findOne({
            activo: 1,
            _id: new bson_1.ObjectID(cat),
        });
        if (!catEncontrada)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No es posible buscar en la base de datos, error en la consulta', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Categoria encontrada, iniciando la carga de variables', idFuncion);
        let varIngresadas = catEncontrada.variables;
        let varRepetidos = [];
        variables.forEach((element) => {
            let caten = varIngresadas.find((elemento) => elemento.activo == 1 && String(elemento.variable) == element);
            if (caten) {
                (0, salida_1.loggerId)(usuario, 'La variable ' + element + ', ya existe', idFuncion);
                varRepetidos.push(caten);
            }
            else {
                let vv = {
                    variable: new mongoose_2.default.Types.ObjectId(element),
                    activo: 1,
                };
                varIngresadas.push(vv);
                catEncontrada.log.push((0, salida_1.formarLog)(usuario, idFuncion, 'INSERTAR VARIABLE', 'Ingreso de una variable a una categoria', element));
            }
        });
        (0, salida_1.loggerId)(usuario, 'Variable ingresadas', idFuncion);
        catEncontrada = await catEncontrada.save();
        if (!catEncontrada)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede guardar la informacion de la categoria', (0, salida_1.obtenerTipo)(3));
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en ingresar las variables', (0, salida_1.obtenerTipo)(2), varRepetidos);
    }
    async eliminarVariables(cat, variable, usuario) {
        const idFuncion = 5005;
        const funDescr = 'QUITAR VARIABLE';
        (0, salida_1.loggerId)(usuario, 'Quitando variables', idFuncion);
        let banFaltante = '';
        if (!cat)
            banFaltante = ' la categoria de donde se va a quitar la variable';
        if (!variable)
            banFaltante = 'las variables a quitar';
        if (banFaltante !== '')
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede quitar la variable, falta' + banFaltante, (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Buscando la categoria ' + cat, idFuncion);
        let catEncontrada = await this.catVariableModel.findOne({
            activo: 1,
            _id: new bson_1.ObjectID(cat),
        });
        if (!catEncontrada)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede buscar la categoria', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Categoria encontrada: ' + catEncontrada.descripcion, idFuncion);
        (0, salida_1.loggerId)(usuario, 'Buscando las variables para remover', idFuncion);
        let variables = catEncontrada.variables;
        let logVarEncontrada = [];
        let logVarNoEncontrada = [];
        variable.forEach((element) => {
            let varEncontrada = variables.find((enc) => enc.variable.toString() === element && enc.activo === 1);
            if (!varEncontrada) {
                logVarNoEncontrada.push(element);
                (0, salida_1.loggerId)(usuario, 'Variable ' + element + ' no encontrada', idFuncion);
            }
            else {
                logVarEncontrada.push(element);
                (0, salida_1.loggerId)(usuario, 'Variable ' + element + ' econtrada!!, iniciando la eliminacion', idFuncion);
                varEncontrada.activo = 0;
            }
        });
        (0, salida_1.loggerId)(usuario, 'Guardando los cambios en categoria ', idFuncion);
        if (logVarEncontrada.length > 0) {
            catEncontrada.log.push((0, salida_1.formarLog)(usuario, idFuncion, funDescr, '', logVarEncontrada));
            catEncontrada = await catEncontrada.save();
            if (!catEncontrada)
                return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se pueden guardar los cambios en la categoria', (0, salida_1.obtenerTipo)(3));
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en eliminar las variables', (0, salida_1.obtenerTipo)(2), logVarEncontrada);
        }
        else {
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No hay variable que eliminar', (0, salida_1.obtenerTipo)(1));
        }
    }
    async actualizarCategorias(usuario, cat, descripcion, dueño) {
        const idFuncion = 5006;
        const funDescr = 'ACTUALIZAR CATEGORIA';
        (0, salida_1.loggerId)(usuario, 'Actualizando la categoria', idFuncion);
        if (!cat)
            (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puede actualizar ya que no tiene la categoria a actualizar', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Buscando la categoria ' + cat, idFuncion);
        let catEncontrada = await this.catVariableModel.findOne({
            activo: 1,
            _id: new bson_1.ObjectID(cat)
        });
        if (!catEncontrada)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se pudo buscar la categoria', (0, salida_1.obtenerTipo)(3));
        (0, salida_1.loggerId)(usuario, 'Categoria encontrada, iniciando la actualizacion', idFuncion);
        if (descripcion)
            catEncontrada.descripcion = descripcion;
        if (dueño)
            catEncontrada.dueño = dueño;
        catEncontrada.log.push((0, salida_1.formarLog)(usuario, idFuncion, funDescr, '', catEncontrada));
        catEncontrada = await catEncontrada.save();
        if (!catEncontrada)
            return (0, salida_1.salidaYLog)(usuario, idFuncion, 'No se puedo guardar la categoria', (0, salida_1.obtenerTipo)(3));
        return (0, salida_1.salidaYLog)(usuario, idFuncion, 'Exito en actualizar', (0, salida_1.obtenerTipo)(2));
    }
    async obtenerData(usuario, categoria) {
        const idFuncion = 5007;
        const funDescr = 'Obteniendo el trabajando';
        const milog = new logs_1.MiLogger(usuario, idFuncion, funDescr);
        milog.crearLog('Buscando todas las variables de la categoria');
        if (!categoria)
            return milog.crearLogYSalida('Error falta la categoria ', 3);
        const queryAggregation = [
            {
                $unwind: {
                    path: '$variables',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'variable',
                    localField: 'variables.variable',
                    foreignField: '_id',
                    as: 'variable2'
                }
            },
            {
                $unwind: {
                    path: '$variable2',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'base',
                    localField: 'variable2.base',
                    foreignField: '_id',
                    as: 'bases'
                }
            },
            {
                $unwind: {
                    path: '$bases',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $and: [
                        { activo: 1 },
                        { _id: new bson_1.ObjectID(categoria) },
                        { $or: [
                                { "variables.activo": 1 },
                                { "variables.activo": null }
                            ] }
                    ]
                }
            },
            {
                $project: {
                    categoria: { $toUpper: "$descripcion" },
                    imagen: 1,
                    nombre_variable: { $toUpper: "$variable2.nombre_variable" },
                    codigo_variable: { $toUpper: "$variable2.codigo_variable" },
                    descripcion_variable: { $toUpper: "$variable2.descripcion" },
                    base: { $toUpper: "$bases.nombre" }
                }
            }
        ];
        milog.crearLog('Iniciando obteniendo los datos');
        let vars = await this.catVariableModel.aggregate(queryAggregation);
        if (!vars)
            return milog.crearLogYSalida('No se pudo obtener las variables', 3);
        return milog.crearLogYSalida('Exito en obtener las variables', 2, vars);
    }
};
CatVariableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('catVariableSchema')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CatVariableService);
exports.CatVariableService = CatVariableService;
//# sourceMappingURL=cat-variable.service.js.map