import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseModel } from 'src/models/base.model';
import { logger, loggerId, obtenerTipo, salidaYLog } from 'src/utils/salida';
import mongoose, { Model, ObjectId } from 'mongoose';
import { ObjectID } from 'bson';

@Injectable()
export class BaseService {
  constructor(
    @InjectModel('BaseSchema') private readonly baseModel: Model<BaseModel>,
  ) {}

  /**
   * ANCHOR 3001- Insertar una base
   * @param nombreBase Nombre que se le da a la base de dato
   * @param departamento  es el departamento de donde viene la base de datos
   * @param dueño es la persona que entrego la base de datos
   * @param tipo es el tipo de la base de datos, este puede ser excel, json o sql
   */
  async insertarBase(
    nombreBase: string,
    departamento: string,
    dueño: string,
    tipo: string,
    usuario: string,
  ): Promise<any> {
    const idFuncion = 3001;
    loggerId(
      usuario,
      'Intentando ingresar una nueva base de datos: ' + nombreBase,
      idFuncion,
    );
    let banFaltante = ''; //bandera que nos indica que es lo que falta
    //revisamos que los datos vengan completos
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

    //ahora regresamos si falta alguna
    if (banFaltante !== '') {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede insertar la base de datos falta: ' + banFaltante,
        obtenerTipo(3),
      );
    }
    //Ahora buscamos la base, para ve si existe una base parcida
    loggerId(
      usuario,
      'Buscando si existe una base de datos con este nombre',
      idFuncion,
    );
    const baseEncontrada = await this.baseModel.findOne({
      activo: 1,
      nombre: nombreBase,
      departamento: departamento,
    });

    if (baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'La base de datos ' + baseEncontrada.nombre + ' ya existe',
        obtenerTipo(3),
      );
    }

    loggerId(usuario, 'Insertando la base de datos', idFuncion);

    let nuevaBase = new this.baseModel({
      nombre: nombreBase,
      departamento: departamento,
      dueño: dueño,
      tipo: tipo,
    });
    loggerId(usuario, 'Creando la base: ' + nuevaBase.nombre, idFuncion);

    nuevaBase = await nuevaBase.save();

    if (!nuevaBase) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error al guardar la base',
        obtenerTipo(3),
      );
    }
    let sal: any[] = [];
    sal.push(nuevaBase);
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en guardar la base',
      obtenerTipo(2),
      sal,
    );
  }

  /**
   * ANCHOR 3002 - eliminar la base
   * @param idBase base a borrar
   * @param usuario quien lo esta haciendo
   */
  async eliminarBase(idBase: string, usuario: string): Promise<any> {
    const idFuncion = 3002;
    loggerId(usuario, 'Intentando eliminar una base', idFuncion);
    let banFaltante = ''; //bandera que nos indica que es lo que falta
    //revisamos que los datos vengan completos
    if (!idBase) {
      banFaltante = 'La base';
    }
    if (mongoose.isValidObjectId(idBase) == false) {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, el formato de la base no es reconocido ' + idBase,
        obtenerTipo(3),
      );
    }

    if (!usuario) {
      banFaltante = 'Usuario que va eliminar la base';
    }

    if (banFaltante !== '') {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede eliminar, ingresar: ' + banFaltante,
        obtenerTipo(3),
      );
    }

    loggerId(usuario, 'Buscando la base: ' + idBase, idFuncion);
    let baseEncontrada = await this.baseModel.findOne({
        _id:new ObjectID(idBase)
    });

    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se encontro la base',
        obtenerTipo(3),
      );
    }

    loggerId(
      usuario,
      'Base encontrada ' + baseEncontrada.nombre + ' empezando a eliminar',
      idFuncion,
    );

    baseEncontrada.activo = 0; //eliminaos la base para que ya no se muestre

    baseEncontrada = await baseEncontrada.save();

    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se pudo eliminar la base',
        obtenerTipo(3),
      );
    }

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en eliminar la base ' + baseEncontrada.nombre,
      obtenerTipo(2),
    );
  }

  /**
   * ANCHOR 3003 - Actualizar la base
   * @param nombre nombre de la base
   * @param departamento el departamento de la base
   * @param tipo el tipo de la base
   * @param dueño el encargado de la base
   * @param idBase la base a actualizar
   */
  async actualizarBase(
    idBase: string,
    usuario: string,
    nombre?: string,
    departamento?: string,
    tipo?: string,
    dueño?: string,
  ) {
    const idFuncion = 3003;

    loggerId(usuario, 'Intentando actualizar la base: ' + idBase, idFuncion);
    let banFaltante = '';

    if (!idBase) {
      banFaltante = 'Base a actualizar';
    }

    

    if (!usuario) {
      banFaltante = 'Usuario que esta intentando actualizar ';
    }

    if (banFaltante !== '') {
      return salidaYLog(
        usuario,
        idFuncion,
        'Error, no se puede actualizar la base: Falta ' + banFaltante,
        obtenerTipo(3),
      );
    }
    if (mongoose.isValidObjectId(idBase) == false) {
        return salidaYLog(
          usuario,
          idFuncion,
          'Error, el formato de la base no es reconocido ' + idBase,
          obtenerTipo(3),
        );
      }
    loggerId(usuario, 'Buscando la base ' + idBase, idFuncion);
    let baseEncontrada = await this.baseModel.findOne({
        _id:new ObjectID(idBase)
    });
    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede actualizar la base',
        obtenerTipo(3),
      );
    }
    loggerId(usuario, 'Base encontrada: ' + baseEncontrada.nombre, idFuncion);

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
    loggerId(usuario, 'Guardando los cambios de la base ....', idFuncion);

    baseEncontrada = await baseEncontrada.save();

    if (!baseEncontrada) {
      return salidaYLog(
        usuario,
        idFuncion,
        'No se puede guardar los cambios de la base',
        obtenerTipo(3),
      );
    }

    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en guardar los cambios en la base ' + baseEncontrada.nombre,
      obtenerTipo(1),
    );
  }

  /**
   * ANCHOR 3004 - Obtener todas la bases activos
   * @param usuario usuario que esta obtieniendo las bases
   */
  async obtenerBasesActiva(usuario: string):Promise<any> {
    const idFuncion = 3004;
    loggerId(usuario, 'Intentando obtener las bases actias', idFuncion);

    if (!usuario) {
      salidaYLog(
        usuario,
        idFuncion,
        'No se puede obtener los datos debido a que falta el usuario',
        obtenerTipo(3),
      );
    }
    const query = { activo: 1 }; // el query para obtener los datos

    const resul = await this.ejecutarConsultaBase(query, usuario);

    if (!resul) {
      salidaYLog(
        usuario,
        idFuncion,
        'Error al obtener los datos ',
        obtenerTipo(3),
      );
    }
 
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en obtener los datos',
      obtenerTipo(1),
      resul,
    );
  }



  async obtenerBasesPorId(idBase:string,usuario: string):Promise<any> {
    const idFuncion = 3006;
    loggerId(usuario, 'Intentando obtener las bases por id: ' + idBase, idFuncion);

    if (!usuario) {
      salidaYLog(
        usuario,
        idFuncion,
        'No se puede obtener los datos debido a que falta el usuario',
        obtenerTipo(3),
      );
    }
    const query = { activo: 1 , _id: new ObjectID(idBase)}; // el query para obtener los datos

    const resul = await this.ejecutarConsultaBase(query, usuario);

    if (!resul) {
      salidaYLog(
        usuario,
        idFuncion,
        'Error al obtener los datos ',
        obtenerTipo(3),
      );
    }
 
    return salidaYLog(
      usuario,
      idFuncion,
      'Exito en obtener los datos',
      obtenerTipo(1),
      resul,
    );
  }



  /**
   * ANCHOR 3005 - Ejecuta un query y devuelve los datos
   * @param query consulta
   */
  async ejecutarConsultaBase(query, usuario: string) {
    const idFuncion = 3005;
    try {
      loggerId(usuario, 'Ejecutando consulta ' + JSON.stringify(query), idFuncion);
      let encontrado = await this.baseModel.find(query);
      if (!encontrado) {
        loggerId(usuario, 'Error al obtener los datos ', idFuncion);
        return null;
      }
      const lon  = encontrado.length
      loggerId(usuario, 'Se encontraron ' + lon + ' registros', idFuncion);
      return encontrado;
    } catch (exception) {
      loggerId(
        usuario,
        'Excepcion al obtener los datos ' + exception,
        idFuncion,
      );
      return null;
    }
  }
}
