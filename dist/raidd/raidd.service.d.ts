import { Model } from 'mongoose';
import { elementoBitacora } from 'src/models/elementoBitacora.model';
import { estadobitacora } from 'src/models/estadoBitacora.model';
import { msgInterno } from 'src/models/interno.model';
export declare class RaiddService {
    private readonly elementoBitacoraModel;
    private readonly estadoBitacoraModel;
    constructor(elementoBitacoraModel: Model<elementoBitacora>, estadoBitacoraModel: Model<estadobitacora>);
    separarEtiquetas(listadoEtiqueta: string): msgInterno;
    buscarEstadoMasNuevo(): Promise<msgInterno>;
    actualizarObservacion(id: string, obsNueva: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    insertarElemento(observaciones: string, tipo: number, etiqueta: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    obtenerTodosElementosBitacora(usuario: string): Promise<import("../utils/salida.model").salida>;
    eliminarEtiqueta(id: string, etiquetaEliminar: string, usuario: string): Promise<import("../utils/salida.model").salida>;
    insertarEtiqueta(id: string, nuevaEtiqueta: string, usuario: string): Promise<import("../utils/salida.model").salida>;
}
