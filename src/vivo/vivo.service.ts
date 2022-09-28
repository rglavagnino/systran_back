import { Inject,Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { crearSalida, obtenerTipo, logger } from 'src/utils/salida';
import { obtenerVersion } from 'src/utils/version';

@Injectable()
export class VivoService {

        constructor(
        ){
           
        }

        obtenerSalud(){
           let ver = obtenerVersion()
            let salidas:any[] = []
            salidas.push(ver)
            console.log(ver)
            const tp = obtenerTipo(1)
            let salida = crearSalida('Estoy vivo', tp,'',salidas) 
            logger('Revisando si esta vivo')
            return salida
        }


}


