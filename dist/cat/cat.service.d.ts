import { Model } from 'mongoose';
import { tipobitacora } from 'src/models/tipoBitacora.model';
import { estadobitacora } from 'src/models/estadoBitacora.model';
import { salida } from 'src/utils/salida.model';
export declare class CatService {
    private readonly tipoBitacoraModel;
    private readonly estadoBitacoraModel;
    constructor(tipoBitacoraModel: Model<tipobitacora>, estadoBitacoraModel: Model<estadobitacora>);
    crearCatalogo(): Promise<salida>;
}
