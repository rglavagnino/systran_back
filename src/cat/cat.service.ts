import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tipobitacora } from 'src/models/tipoBitacora.model';
import { crearSalida, logger, obtenerTipo } from 'src/utils/salida';
import tipoJson from '../data/tipobitacora.json';
import estadoJson from '../data/estadobitacora.json';
import { estadobitacora } from 'src/models/estadoBitacora.model';
import { salida } from 'src/utils/salida.model';

@Injectable()
export class CatService {
  constructor(
    @InjectModel('Tipo')
    private readonly tipoBitacoraModel: Model<tipobitacora>,
    @InjectModel('Estado')
    private readonly estadoBitacoraModel: Model<estadobitacora>,
  ) {}

  //ANCHOR crear catalogo
  async crearCatalogo() {
    let resultado: salida;
    // Primero revisamos si no existen, si existen no hacemos nada
    if (!tipoJson) {
      //existe datos en los archivs
      let msg = 'No hay data en los catalogos';
      logger(msg);
      resultado = crearSalida(msg, obtenerTipo(3), '', []);
    } else {
      let tipoBita = await this.tipoBitacoraModel.countDocuments();
      if (tipoBita < 1) {
        let resul = await this.tipoBitacoraModel.insertMany(tipoJson);
        let resules = await this.estadoBitacoraModel.insertMany(estadoJson);
        let msg =
          'Se crearon ' +
          resul.length.toString() +
          ' tipos y ' +
          resules.length.toString() +
          ' estados';
        logger(msg);
        return crearSalida(msg, obtenerTipo(2), '', []);
      } else {
        let msg = 'Ya hay datos, no se insertaron ';
        logger(msg);
        return crearSalida(msg, obtenerTipo(3), '', []);
      }
    }
  }
}
