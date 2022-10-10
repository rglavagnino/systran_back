"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoBase = void 0;
class EstadoBase {
    constructor() { }
    obtenerEstadoBase(est) {
        switch (est) {
            case 10:
                return 'RECIBIDO';
            case 20:
                return 'PREPROCENDADO';
            case 30:
                return 'DURMIENDO';
            case 40:
                return 'TRABAJANDO';
            case 50:
                return 'MODELADO';
            case 60:
                return 'CERRADO';
        }
    }
    obtenerCodigoBase(estado) {
        switch (estado) {
            case 'RECIBIDO':
                return 10;
            case 'PREPROCESANDO':
                return 20;
            case 'DURMIENDO':
                return 30;
            case 'TRABAJANDO':
                return 40;
            case 'MODELADO':
                return 50;
            case 'CERRADO':
                return 60;
            default:
                return 0;
        }
    }
    estadoInicialBase() {
        return 10;
    }
    preprocesar(estActual) {
        if (estActual === 10 || estActual === 50 || estActual === 40)
            return 20;
        else
            return 0;
    }
    dormir(estActual) {
        if (estActual === 20 || estActual === 50 || estActual === 40)
            return 30;
        else
            return 0;
    }
    trabajar(estActual) {
        if (estActual === 30 || estActual === 20)
            return 40;
        else
            return 0;
    }
    modelado(estActual) {
        if (estActual === 40)
            return 50;
        else
            return 0;
    }
    cerrar(estActual) {
        if (estActual === 20 ||
            estActual === 30 ||
            estActual === 40 ||
            estActual === 50)
            return 30;
        else
            return 0;
    }
    cambiarEstado(estadoAntiguo, estadoNuevo) {
        const esAntiguo = this.obtenerCodigoBase(estadoAntiguo);
        const esNuevo = this.obtenerCodigoBase(estadoNuevo);
        if (esNuevo === 10) {
            return false;
        }
        if (esNuevo === 20) {
            if (esAntiguo === 10 || esAntiguo === 50 || esAntiguo === 40)
                return true;
            else
                return false;
        }
        if (esNuevo === 30) {
            if (esAntiguo === 20 || esAntiguo === 50 || esAntiguo === 40)
                return true;
            else
                return false;
        }
        if (esNuevo === 40) {
            if (esAntiguo === 30 || esAntiguo === 20)
                return true;
            else
                return false;
        }
        if (esNuevo === 50) {
            if (esAntiguo === 40)
                return true;
            else
                return false;
        }
        if (esNuevo === 60) {
            if (esAntiguo === 20 ||
                esAntiguo === 30 ||
                esAntiguo === 40 ||
                esAntiguo === 50)
                return true;
            else
                return false;
        }
    }
}
exports.EstadoBase = EstadoBase;
//# sourceMappingURL=cat.js.map