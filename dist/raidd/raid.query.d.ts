export declare const queryObtenerBitacora: ({
    $unwind: {
        path: string;
        preserveNullAndEmptyArrays: boolean;
    };
    $match?: undefined;
    $lookup?: undefined;
    $project?: undefined;
    $addFields?: undefined;
} | {
    $match: {
        $and: ({
            activo: number;
            'tipo.activo'?: undefined;
            'estado.activo'?: undefined;
            'observaciones.activo'?: undefined;
        } | {
            'tipo.activo': number;
            activo?: undefined;
            'estado.activo'?: undefined;
            'observaciones.activo'?: undefined;
        } | {
            'estado.activo': number;
            activo?: undefined;
            'tipo.activo'?: undefined;
            'observaciones.activo'?: undefined;
        } | {
            'observaciones.activo': number;
            activo?: undefined;
            'tipo.activo'?: undefined;
            'estado.activo'?: undefined;
        })[];
    };
    $unwind?: undefined;
    $lookup?: undefined;
    $project?: undefined;
    $addFields?: undefined;
} | {
    $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
    };
    $unwind?: undefined;
    $match?: undefined;
    $project?: undefined;
    $addFields?: undefined;
} | {
    $project: {
        tipobitacora: number;
        esBitacora: number;
        observaciones: number;
        fecha: number;
        etiqueta2: {
            $filter: {
                input: string;
                as: string;
                cond: {
                    $eq: (string | number)[];
                };
            };
        };
        Fecha?: undefined;
        Hora?: undefined;
        _id?: undefined;
        RAIDD?: undefined;
        Estado?: undefined;
        Observaciones?: undefined;
        Etiquetas?: undefined;
    };
    $unwind?: undefined;
    $match?: undefined;
    $lookup?: undefined;
    $addFields?: undefined;
} | {
    $addFields: {
        Etiqueta: {
            $reduce: {
                input: string;
                initialValue: string;
                in: {
                    $cond: {
                        if: {
                            $and: {
                                $eq: (number | {
                                    $indexOfArray: string[];
                                })[];
                            }[];
                        };
                        then: {
                            $concat: string[];
                        };
                        else: {
                            $concat: string[];
                        };
                    };
                };
            };
        };
    };
    $unwind?: undefined;
    $match?: undefined;
    $lookup?: undefined;
    $project?: undefined;
} | {
    $project: {
        Fecha: {
            $dateToString: {
                format: string;
                date: string;
            };
        };
        Hora: {
            $dateToString: {
                format: string;
                date: string;
                timezone: string;
            };
        };
        _id: number;
        RAIDD: string;
        Estado: string;
        Observaciones: string;
        Etiquetas: string;
        tipobitacora?: undefined;
        esBitacora?: undefined;
        observaciones?: undefined;
        fecha?: undefined;
        etiqueta2?: undefined;
    };
    $unwind?: undefined;
    $match?: undefined;
    $lookup?: undefined;
    $addFields?: undefined;
})[];
