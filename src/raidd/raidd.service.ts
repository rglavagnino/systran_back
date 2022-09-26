import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { elementoBitacora } from 'src/models/elementoBitacora.model';
import { estadobitacora } from 'src/models/estadoBitacora.model';
import { msgInterno } from 'src/models/interno.model';
import { crearSalida, logger, obtenerTipo, loggerId } from 'src/utils/salida';

import { queryObtenerBitacora } from 'src/raidd/raid.query';
import { raidd } from './raidd.model';
import { tipobitacora } from 'src/models/tipoBitacora.model';
import { ObjectID } from 'bson';

@Injectable()
export class RaiddService {
  constructor(
    @InjectModel('ElementoBitacora')
    private readonly elementoBitacoraModel: Model<elementoBitacora>,
    @InjectModel('EstadoBitacora')
    private readonly estadoBitacoraModel: Model<estadobitacora>,
  ) {}

  /**
   * 1003
   * @param listadoEtiqueta etiquetas separadas por comas
   */
  separarEtiquetas(listadoEtiqueta: string): msgInterno {
    logger('1003 - Separando las etiquetas ' + listadoEtiqueta);
    let mensaje: msgInterno = {
      tipo: 0,
      mensaje: '',
      dataUnico: 1,
      dataArreglo: [],
    };
    if (listadoEtiqueta) {
      const sep: string[] = listadoEtiqueta.split(',');
      mensaje.tipo = 1;
      mensaje.dataArreglo = sep;
    } else {
      mensaje.tipo = 0;
    }
    return mensaje;
  }

  /**
   * Buscamos el estado mas nuevo, para poder insertarlo
   * id:1001
   * ANCHOR 1001 buscar estado mas nuevo
   */
  async buscarEstadoMasNuevo() {
    let resul: msgInterno = {
      tipo: 0,
      mensaje: '',
      dataUnico: 1,
      dataArreglo: [],
    };
    logger('1001 - Buscando el estado mas nuevo');
    const primerEstado = await this.estadoBitacoraModel
      .findOne({ activo: 1 }, { _id: 0, __v: 0, activo: 0 }, { oid: 1 })
      .catch((err) => {
        resul.tipo = 0;
        resul.mensaje = err;
        logger('1001 - No se puede obtener el primer estado');
      });
    if (primerEstado) {
      const resultado = primerEstado as estadobitacora;
      resul.tipo = 1;
      resul.dataUnico = resultado.oid;
      logger('1001 - Primer estado encontrado ' + resultado.estado);
    } else {
      resul.tipo = 0;
      resul.mensaje = 'Ningún estado encontrado';
      logger('1001 - No hay ningun primer estado');
    }
    return resul;
  }

  /**
   * ANCHOR 1007 Actualizar observacion
   * @param id
   * @param obsNueva
   * @param usuario
   * @returns
   */
  async actualizarObservacion(id: string, obsNueva: string, usuario: string) {
    const idFuncion = 1007;

    if (!usuario) {
      loggerId(
        usuario,
        'Actualización fallida de etiqueta, falta el usuario creador ',
        idFuncion,
      );
      const sal = crearSalida(
        'Actualización fallida de etiqueta, falta el usuario creador ',
        obtenerTipo(3),
        'Falta el usuario',
        [],
      );
      return sal;
    }

    if (!obsNueva) {
      const msg =
        'Falla la Actualización debido a que no se tiene una observación valida';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    }

    if (mongoose.isValidObjectId(id) == false) {
      loggerId(
        usuario,
        'Falla la actualización debido a que no se tiene un id valido',
        idFuncion,
      );
      const salida = crearSalida(
        'Falla la actualización debido a que no se tiene un id valido',
        obtenerTipo(3),
        '',
        [],
      );
      return salida;
    }
    loggerId(
      usuario,
      'Actualización la etiqueta ' + this.eliminarEtiqueta + ' ' + id,
      idFuncion,
    );

    loggerId(usuario, 'Buscando el elemento de la bitcora', idFuncion);
    let elemento = await this.elementoBitacoraModel.find({

        activo:1
        ,_id:new ObjectID(id)
    });

    if (!elemento) {
      const msg = 'elemento ' + id + ' no encontrado';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    } else {


        if (elemento.length < 1) {
            let msg = 'No se encuentra el elemento de la bitacora';
            loggerId(usuario, msg, idFuncion);
            const salida = crearSalida(msg, obtenerTipo(3), '', []);
            return salida;
          }

      let dataEncontrada = elemento[0]
      let msg = 'Obteniendo las observación de ' + id;
      loggerId(usuario, msg, idFuncion);
      let obs = dataEncontrada.observaciones;
      if (!obs) {
        msg = 'No tiene observación ' + id;
        loggerId(usuario, msg, idFuncion);
      }
      loggerId(usuario, 'Buscando la observación activa', idFuncion);
      let el = obs.findIndex((x) => {
        return x.activo === 1;
      });
      if (el === -1) {
        msg = 'observación activa no encontrada';
        loggerId(usuario, msg, idFuncion);
      }
      let obsEncontrada = obs[el];
      loggerId(
        usuario,
        'Observacion encontrada ' + obsEncontrada.observaciones,
        idFuncion,
      );
      obsEncontrada.activo = 0;
      const newObs = {
        observaciones: obsNueva,
        usuario: usuario,
        activo: 1,
      };

      dataEncontrada.observaciones.push(newObs);
      loggerId(usuario, 'Intentando de guardar en la BDD', idFuncion);
      await dataEncontrada.save().catch((Err) => {
        msg =
          'No se puede actualizar la observación ' +
          obsNueva +
          ' Error en guardar en la base de datos';
        loggerId(usuario, msg + ' ' + Err.toString(), idFuncion);
        const salida = crearSalida(msg, obtenerTipo(3), '', []);
        return salida;
      });
      msg = 'Observacion actualizada ';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(2), '', []);
      return salida;
    }
  }

  /**
   *
   * ANCHOR  1002  - Elemento Nuevo
   * id 1002
   * @param observaciones Observacion del elemento de bitacora
   * @param tipo Tipo bitacora
   * @param etiqueta etiquetas, separadas por coma
   * @param usuario usuario que lo esta haciendo
   * @returns
   */
  async insertarElemento(
    observaciones: string,
    tipo: number,
    etiqueta: string,
    usuario: string,
  ) {
    if (!usuario) {
      const sal = crearSalida(
        'Creacion fallida de elemento bitacora, falta el usuario creador ',
        obtenerTipo(3),
        'Falta el usuario',
        [],
      );
      logger('1002 - Creacion fallida de elemento bitacora falta el usuario');
      return sal;
    }
    logger('1002 - Ingresando nuevo tipo de bitacora ' + tipo);
    const newObs = {
      observaciones: observaciones,
      usuario: usuario,
      activo: 1,
    };
    const newTipo = {
      tid: tipo,
      usuario,
      activo: 1,
      fecha: undefined,
    };
    const elementoNuevo = new this.elementoBitacoraModel({
      activo: 1,
      usuario,
    });

    const msgEstadoInsertar = await this.buscarEstadoMasNuevo();
    if (msgEstadoInsertar.tipo === 0) {
      const sal = crearSalida(
        'Creacion fallida de elemento bitacora ' + tipo,
        obtenerTipo(3),
        msgEstadoInsertar.mensaje,
        [],
      );
      logger('1002 - Creacion fallida de elemento bitacora ' + tipo);
      return sal;
    }
    const estadoInsertar = msgEstadoInsertar.dataUnico;
    const estadoNuevo = {
      oid: estadoInsertar,
      usuario,
      activo: 1,
    };
    elementoNuevo.estado.push(estadoNuevo);
    elementoNuevo.observaciones.push(newObs);
    if (tipo) elementoNuevo.tipo.push(newTipo);
    else {
      const sal = crearSalida(
        'Creacion fallida de elemento bitacora, falta el tipo ',
        obtenerTipo(3),
        'Falta el tipo',
        [],
      );
      logger('1002 - Creacion fallida de elemento bitacora falta el tipo');
      return sal;
    }
    if (etiqueta) {
      let menEtiqueta = this.separarEtiquetas(etiqueta);
      if (menEtiqueta.tipo == 1) {
        const etiquetas = menEtiqueta.dataArreglo;
        etiquetas.forEach((et) => {
          const etiquetaNueva = {
            etiqueta: et,
            usuario,
            activo: 1,
          };
          elementoNuevo.etiqueta.push(etiquetaNueva);
        });
      }
    }

    await elementoNuevo.save().catch((err) => {
      const sal = crearSalida(
        'Creacion fallida de elemento bitacora ' + tipo,
        obtenerTipo(3),
        err,
        [],
      );
      logger('1002 - Creacion fallida de elemento bitacora ' + tipo);
      return sal;
    });
    let resul = [];
    resul.push(elementoNuevo);
    const sal = crearSalida(
      'Creacion exitosa de elemento bitacora ' + tipo,
      obtenerTipo(2),
      '',
      resul,
    );
    logger('1002 - Creacion exitosa de elemento bitacora ' + tipo);
    return sal;
  }

  /**
   * ANCHOR 1004 - obtener los elementos de la bitacora
   */
  async obtenerTodosElementosBitacora(usuario: string) {
    const idFuncion = 1004;
    loggerId(
      usuario,
      'obteniendo todos los elementos de la bitacora',
      idFuncion,
    );
    const query = queryObtenerBitacora;
    const resul = await this.elementoBitacoraModel.aggregate(query);
    const arr: raidd[] = resul.map((ra) => {
      return <raidd>{
        Fecha: ra.Fecha,
        Hora: ra.Hora,
        RAIDD: ra.RAIDD,
        Observaciones: ra.Observaciones,
        Etiquetas: ra.Etiquetas,
        id: ra._id,
      };
    });
    loggerId(
      usuario,
      'Se obtuvieron ' + arr.length.toString() + ' resultados',
      idFuncion,
    );
    const salida = crearSalida('', obtenerTipo(2), '', arr);
    return salida;
  }

  /**
   *
   * ANCHOR 1005 - Eliminar las etiquetas
   * @param id id del elemento de la bitacora
   */
  async eliminarEtiqueta(
    id: string,
    etiquetaEliminar: string,
    usuario: string,
  ) {
    const idFuncion = 1005;

    if (!usuario) {
      loggerId(
        usuario,
        'Eliminacion fallida de etiqueta, falta el usuario creador ',
        idFuncion,
      );
      const sal = crearSalida(
        'Eliminacion fallida de etiqueta, falta el usuario creador ',
        obtenerTipo(3),
        'Falta el usuario',
        [],
      );
      return sal;
    }

    if (!etiquetaEliminar) {
      const msg =
        'Falla la eliminacion debido a que no se tiene una etiqueta valida';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    }

    if (mongoose.isValidObjectId(id) == false) {
      logger(
        '1005 - Falla la eliminacion debido a que no se tiene un id valido',
      );
      const salida = crearSalida(
        'Falla la eliminacion debido a que no se tiene un id valido',
        obtenerTipo(3),
        '',
        [],
      );
      return salida;
    }
    logger('1005 - Eliminando la etiqueta ' + this.eliminarEtiqueta + ' ' + id);

    logger('1005 - Buscando el elemento de la bitcora');
    let elemento = await this.elementoBitacoraModel.findById(id);

    if (!elemento) {
      const msg = 'elemento ' + id + ' no encontrado';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    } else {
      let msg = 'Obteniendo las etiquetas de ' + id;
      loggerId(usuario, msg, idFuncion);
      let etiquetas = elemento.etiqueta;
      if (!etiquetas) {
        msg = 'No tiene etiqueta ' + id;
        loggerId(usuario, msg, idFuncion);
      }
      loggerId(usuario, 'Buscando la etiqueta ' + etiquetaEliminar, idFuncion);
      let el = etiquetas.findIndex((x) => {
        return x.etiqueta === etiquetaEliminar && x.activo === 1;
      });
      if (el === -1) {
        msg = 'Etiqueta no encontrada';
        loggerId(usuario, msg, 1005);
        return crearSalida(msg, obtenerTipo(1), '', []);
      } else {
        let etiquetaEncontrada = etiquetas[el];
        etiquetaEncontrada.activo = 0;
        await elemento.save().catch((Err) => {
          msg =
            'No se puede eliminar la etiqueta ' +
            etiquetaEliminar +
            ' Error en guardar en la base de datos';
          loggerId(usuario, msg + ' ' + Err.toString(), idFuncion);
          const salida = crearSalida(msg, obtenerTipo(3), '', []);
          return salida;
        });
        msg = 'Etiqueta ' + etiquetaEliminar + ' eliminada';
        const salida = crearSalida(msg, obtenerTipo(2), '', []);
        return salida;
      }
    }
  }

  /**
   *
   * ANCHOR 1006 - Insertar las etiquetas
   * @param id id del elemento de la bitacora
   */
  async insertarEtiqueta(id: string, nuevaEtiqueta: string, usuario: string) {
    const idFuncion = 1006;
    if (!usuario) {
      loggerId(
        usuario,
        'Agregación fallida de etiqueta, falta el usuario creador ',
        idFuncion,
      );
      const sal = crearSalida(
        'Agregación fallida de etiqueta, falta el usuario creador ',
        obtenerTipo(3),
        'Falta el usuario',
        [],
      );
      return sal;
    }
    if (!nuevaEtiqueta) {
      const msg =
        'Falla la agregación debido a que no se tiene una etiqueta valida';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    }
    loggerId(
      usuario,
      'Agregando la etiqueta ' + nuevaEtiqueta + ' en el tarea ' + id,
      idFuncion,
    );

    if (mongoose.isValidObjectId(id) == false) {
      loggerId(
        usuario,
        'Falla la agregación debido a que no se tiene un id valido',
        idFuncion,
      );
      const salida = crearSalida(
        'Falla la agregación debido a que no se tiene un id valido',
        obtenerTipo(3),
        '',
        [],
      );
      return salida;
    }

    loggerId(usuario, 'Buscando el elemento de la bitcora', idFuncion);
    let elemento = await this.elementoBitacoraModel.findById(id);

    if (!elemento) {
      const msg = 'elemento ' + id + ' no encontrado';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    } else {
      let msg = 'Obteniendo las etiquetas de ' + id;
      loggerId(usuario, msg, idFuncion);
      let etiquetas = elemento.etiqueta;
      if (!etiquetas) {
        msg = 'No tiene etiqueta ' + id;
        loggerId(usuario, msg, idFuncion);
      }
      loggerId(
        usuario,
        'Buscando la etiqueta ' + nuevaEtiqueta + ' para revisar si existe',
        idFuncion,
      );
      let el = etiquetas.findIndex((x) => {
        return x.etiqueta === nuevaEtiqueta && x.activo === 1;
      });
      if (el > -1) {
        msg = 'Etiqueta ya existe, no se puede agregar';
        loggerId(usuario, msg, idFuncion);
        return crearSalida(msg, obtenerTipo(1), '', []);
      } else {
        let nueva = {
          etiqueta: nuevaEtiqueta,
          activo: 1,
          usuario: usuario,
        };
        elemento.etiqueta.push(nueva);
        await elemento.save().catch((Err) => {
          msg =
            'No se puede agregar la etiqueta ' +
            nuevaEtiqueta +
            ' Error en guardar en la base de datos';
          loggerId(usuario, msg + ' ' + Err.toString(), idFuncion);
          const salida = crearSalida(msg, obtenerTipo(3), '', []);
          return salida;
        });
        msg = 'Etiqueta ' + nuevaEtiqueta + ' agregada';
        const salida = crearSalida(msg, obtenerTipo(2), '', []);
        return salida;
      }
    }
  }

  /**
   * ANCHOR 1008 - actualizar tipo
   * @param id id del elemento de la bitacora
   * @param nuevaTipo
   * @param usuario
   * @returns
   */
  async actualizarTipo(id: string, nuevaTipo: Number, usuario: string) {
    const idFuncion = 1008;
    if (!usuario) {
      loggerId(
        usuario,
        'Agregación fallida de tipo, falta el usuario creador ',
        idFuncion,
      );
      const sal = crearSalida(
        'Agregación fallida de tipo, falta el usuario creador ',
        obtenerTipo(3),
        'Falta el usuario',
        [],
      );
      return sal;
    }
    if (!nuevaTipo) {
      const msg =
        'Falla la agregación debido a que no se tiene una tipo valida';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    }
    loggerId(
      usuario,
      'Agregando la tipo ' + nuevaTipo + ' en el tarea ' + id,
      idFuncion,
    );

    if (mongoose.isValidObjectId(id) == false) {
      loggerId(
        usuario,
        'Falla la agregación debido a que no se tiene un id valido',
        idFuncion,
      );
      const salida = crearSalida(
        'Falla la agregación debido a que no se tiene un id valido',
        obtenerTipo(3),
        '',
        [],
      );
      return salida;
    }

    loggerId(usuario, 'Buscando el elemento de la bitcora', idFuncion);
    let elemento = await this.elementoBitacoraModel.findById(id);

    if (!elemento) {
      const msg = 'elemento ' + id + ' no encontrado';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    } else {
      let msg = 'Obteniendo los tipos de ' + id;
      loggerId(usuario, msg, idFuncion);
      let tipo = elemento.tipo;
      if (!tipo) {
        msg = 'No tiene tipo ' + id;
        loggerId(usuario, msg, idFuncion);
      }
      loggerId(
        usuario,
        'Buscando el tipo activo para revisar si existe',
        idFuncion,
      );
      let el = tipo.findIndex((x) => {
        return x.activo === 1;
      });
      if (el === -1) {
        msg = 'El elemento no tiene tipo activo';
        loggerId(usuario, msg, idFuncion);
      } else {
        let antigua = tipo[el];
        loggerId(
          usuario,
          'Revisando si ' + nuevaTipo + ' ya esta como tipo activo',
          idFuncion,
        );
        if (antigua.tid === nuevaTipo) {
          msg = 'El tipo seleccionado ya existe como activo';
          loggerId(usuario, msg, idFuncion);
          const salida = crearSalida(msg, obtenerTipo(1), '', []);
          return salida;
        } else {
          loggerId(usuario, 'Inactivando el tipo anterior', idFuncion);
          antigua.activo = 0;
          let nueva = {
            tid: nuevaTipo,
            activo: 1,
            usuario: usuario,
          };
          loggerId(usuario, 'Ingresando nuevo tipo', idFuncion);
          elemento.tipo.push(nueva);
          await elemento.save().catch((Err) => {
            msg =
              'No se puede agregar el tipo ' +
              nuevaTipo +
              ' Error en guardar en la base de datos';
            loggerId(usuario, msg + ' ' + Err.toString(), idFuncion);
            const salida = crearSalida(msg, obtenerTipo(3), '', []);
            return salida;
          });
          msg = 'Tipo ' + '' + ' agregado';
          loggerId(usuario, msg, idFuncion);
          const salida = crearSalida(msg, obtenerTipo(2), '', []);
          return salida;
        }
      }
    }
  }

  /**
   * ANCHOR 1009 - Eliminar elemento
   * @param id id de la tarea
   * @param usuario el usuario que lo hace
   * @returns salida
   */
  async eliminarElemento(id: string, usuario: string) {
    const idFuncion = 1009;
    if (!usuario) {
      loggerId(
        usuario,
        'Eliminación fallida, falta el usuario creador ',
        idFuncion,
      );
      const sal = crearSalida(
        'Eliminación fallida , falta el usuario creador ',
        obtenerTipo(3),
        'Falta el usuario',
        [],
      );
      return sal;
    }

    loggerId(usuario, 'Eliminando el elemento ' + id, idFuncion);

    if (mongoose.isValidObjectId(id) == false) {
      loggerId(
        usuario,
        'Falla la eliminación debido a que no se tiene un id valido',
        idFuncion,
      );
      const salida = crearSalida(
        'Falla la eliminación debido a que no se tiene un id valido',
        obtenerTipo(3),
        '',
        [],
      );
      return salida;
    }

    loggerId(usuario, 'Buscando el elemento de la bitcora', idFuncion);
    let elemento = await this.elementoBitacoraModel.find({
      _id: new ObjectID(id),
      activo: 1,
    });
    if (!elemento) {
      const msg = 'elemento ' + id + ' no encontrado';
      loggerId(usuario, msg, idFuncion);
      const salida = crearSalida(msg, obtenerTipo(3), '', []);
      return salida;
    } else {
      if (elemento.length < 1) {
        let msg = 'No se encuentra el elemento de la bitacora';
        loggerId(usuario, msg, idFuncion);
        const salida = crearSalida(msg, obtenerTipo(3), '', []);
        return salida;
      } else {
        loggerId(
          usuario,
          'Intentando eliminar el elemento de la bitacora',
          idFuncion,
        );
        await this.elementoBitacoraModel
          .findOneAndUpdate({ _id: new ObjectID(id) }, { activo: 0 })
          .catch((Err) => {
            let msg =
              'No se puede eliminar' + ' Error en guardar en la base de datos';
            loggerId(usuario, msg + ' ' + Err.toString(), idFuncion);
            const salida = crearSalida(msg, obtenerTipo(3), '', []);
            return salida;
          });
        let msg = 'Bitacora eliminada';
        loggerId(usuario, msg, idFuncion);
        const salida = crearSalida(msg, obtenerTipo(2), '', []);
        return salida;
      }
    }
  }
} //fin de clase
