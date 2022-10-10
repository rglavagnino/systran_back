import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { VariableModel } from 'src/models/variable.model';
import { formarLog, loggerId, obtenerTipo, salidaYLog } from 'src/utils/salida';
import { ObjectID } from 'bson';
import { Console } from 'console';

@Injectable()
export class VariableService {
  constructor(
    @InjectModel('VariableSchema')
    private readonly variableModel: Model<VariableModel>,
  ) {}

  /**
   * ANCHOR 4001 insertar
   * @param nombre
   * @param norm
   * @param codigo
   * @param desechado
   * @param descr
   * @param base
   */
  async insertarVariable(
    nombre: string,
    norm: string,
    codigo: string,
    desechado: number,
    descr: string,
    base: string,
    usuario: string,
  ) {
    const idFuncion = 4001;
    const funDescr = 'CREACION DE VARIABLE';
    const dlog = {
      nombre,
      normalizado: norm,
      codigo,
      desechado,
      descr,
      base,
    };
    loggerId(usuario, 'Creando una variable', idFuncion);

    let banFaltante = '';

    if (!base) {
      banFaltante = 'Base de la variable ';
    }

    if (!usuario) {
      banFaltante = 'Usuario que esta intentando crear ';
    }

    if (banFaltante !== '') {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, no se puede crear la variable: Falta ' + banFaltante,
        obtenerTipo(3),
      );
    }

    if (mongoose.isValidObjectId(base) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + base,
        obtenerTipo(3),
      );
    }

    loggerId(
      usuario,
      'Buscando si existe una variable con el mismo nombre',
      idFuncion,
    );

    let varEncontrada = await this.variableModel
      .findOne({
        activo: 1,
        nombre_variable: nombre,
      })
      .exec();

    if (varEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Ya existe una variable con el mismo nombre',
        obtenerTipo(3),
      );
    }

    loggerId(
      usuario,
      'Variable no encontrada, inicio de la creacion ',
      idFuncion,
    );
    const log = formarLog(usuario, idFuncion, funDescr, '', dlog);
    const flog = [];
    flog.push(log);
    const varNu = new this.variableModel({
      nombre_variable: nombre,
      nombre_normalizado: norm,
      codigo_variable: codigo,
      desechado: desechado,
      descripcion: descr,
      base: new ObjectID(base),
      log: flog,
    });
    loggerId(usuario, 'Intentando guardar en la base de datos', idFuncion);
    let nuevaVariable = await varNu.save();

    if (!nuevaVariable) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se pudo crear la variable ',
        obtenerTipo(3),
      );
    }
    const sal = [];
    sal.push(nuevaVariable._id);
    return salidaYLog(
      usuario,
      idFuncion,
      'Variable ' +
        nuevaVariable.nombre_variable +
        ' ha sido creado exitosamente',
      obtenerTipo(2),
      sal,
    );
  }

  /**
   * ANCHOR eliminar
   * @param id
   * @param usuario
   */
  async eliminarVariable(id: string, usuario: string) {
    const idFuncion = 4002;
    const funDescr = 'ELIMINACION DE VARIABLE';
    const log = { id };
    loggerId(usuario, 'Elimando una variable', idFuncion);

    if (!id) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede eliminar la variable debido a que no viene el id de esta',
        obtenerTipo(3),
      );
    }

    if (mongoose.isValidObjectId(id) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + id,
        obtenerTipo(3),
      );
    }

    loggerId(usuario, 'Buscando la variable ' + id, idFuncion);

    let varEncontrada = await this.variableModel.findOne({
      activo: 1,
      _id: new ObjectID(id),
    });

    if (!varEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se encontro la variable a eliminar',
        obtenerTipo(3),
      );
    }

    loggerId(
      usuario,
      'Variable encontrada! iniciando la eliminacion',
      idFuncion,
    );

    varEncontrada.activo = 0;
    const dlog = formarLog(usuario, idFuncion, funDescr, '', log);
    varEncontrada.log.push(dlog);
    varEncontrada = await varEncontrada.save();

    if (!varEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error al eliminar la bdd',
        obtenerTipo(3),
      );
    }

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en eliminar la variable',
      obtenerTipo(2),
    );
  }

  /**
   * ANCHOR actualizar
   * @param nombre
   * @param norm
   * @param codigo
   * @param desechado
   * @param descr
   * @param base
   * @param usuario
   */
  async actualizarVariable(
    variable: string,
    usuario: string,
    nombre?: string,
    norm?: string,
    codigo?: string,
    desechado?: number,
    descr?: string,
  ) {
    const idFuncion = 4003;
    const funDescr = 'ACTUALIZACION DE VARIABLE';

    const dlog = {
      nombre_variable: nombre,
      normalizado: norm,
      codigo: codigo,
      desechado,
      descr,
      variable,
    };
    loggerId(usuario, 'Intentando actualizar una variable', idFuncion);

    if (!variable) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede actualizar, falte el id de la variable',
        obtenerTipo(3),
      );
    }

    if (mongoose.isValidObjectId(variable) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la variable no es reconocido ' + variable,
        obtenerTipo(3),
      );
    }
    loggerId(usuario, 'Buscando la variable a actualizar', idFuncion);

    let varEncontrada = await this.variableModel.findOne({
      activo: 1,
      _id: new ObjectID(variable),
    });

    if (!varEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se encontro la variable a actualizar',
        obtenerTipo(3),
      );
    }

    loggerId(
      usuario,
      'Variable ' +
        varEncontrada.nombre_variable +
        ' encontrada, iniciando la actualizacion',
      idFuncion,
    );

    if (nombre) varEncontrada.nombre_variable = nombre;
    if (norm) varEncontrada.nombre_normalizado = norm;
    if (codigo) varEncontrada.codigo_variable = codigo;

    if (desechado !== undefined && desechado !== null) {

      varEncontrada.desechado = desechado;
    }
    if (descr) varEncontrada.descripcion = descr;

    const log = formarLog(usuario, idFuncion, funDescr, '', dlog);
    varEncontrada.log.push(log);
    varEncontrada.save();

    if (!varEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puedo actualizar la base de datos',
        obtenerTipo(3),
      );
    }

    let sal = [];
    sal.push(varEncontrada._id);
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en guardar los cambios de la funcion',
      obtenerTipo(2),
      sal,
    );
  }

  /**
   * ANCHOR obtener por base
   * @param base
   * @param usuario
   */
  async obtenerVariableBase(base, usuario: string) {
    const idFuncion = 4004;
    loggerId(usuario, 'Obteniendo las variables dado una base', idFuncion);
    if (!base)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede obtener los datos ya que falta la base de datos',
        obtenerTipo(3),
      );
    if (mongoose.isValidObjectId(base) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + base,
        obtenerTipo(3),
      );
    }
    const varEncontradas = await this.variableModel
      .find({
        activo: 1,
        base: new ObjectID(base),
      },{log:0})
      .exec();

    if (!varEncontradas)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se pudo obtener los datos de las variables',
        obtenerTipo(3),
      );

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en obtener ' + varEncontradas.length + ' variables',
      obtenerTipo(1),
      varEncontradas,
    );
  }

  /**
   * ANCHOR obtener todas las variables
   * @param usuario
   */
  async obtenerTodasVariables(usuario: string) {
    const idFuncion = 4005;
    loggerId(usuario, 'Obteniendo todas las variables ', idFuncion);

    const varEncontradas = await this.variableModel
      .find({
        activo: 1,
      },{log:0})
      .exec();

    if (!varEncontradas)
      return salidaYLog(
        usuario,
        idFuncion,
        'No se pudo obtener los datos de las variables',
        obtenerTipo(3),
      );

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en obtener ' + varEncontradas.length + ' variables',
      obtenerTipo(1),
      varEncontradas,
    );
  }
}
