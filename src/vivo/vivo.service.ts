import { Injectable } from '@nestjs/common';
import { crearSalida, obtenerTipo, logger } from 'src/utils/salida';
import { obtenerVersion } from 'src/utils/version';

@Injectable()
export class VivoService {

        constructor(){

        }

        obtenerSalud(){
            const ver = obtenerVersion()
            const tp = obtenerTipo(1)
            let salida = crearSalida('Estoy vivo', tp,ver,[]) 
            logger('Revisando si esta vivo')
            return salida
        }


}


