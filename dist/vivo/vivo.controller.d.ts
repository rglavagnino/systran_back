import { VivoService } from './vivo.service';
export declare class VivoController {
    private readonly vivoSrv;
    constructor(vivoSrv: VivoService);
    obtenerVivo(): import("../utils/salida.model").salida;
}
