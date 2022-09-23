export const queryObtenerBitacora = [
  {
    '$unwind': {
      'path': '$estado', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$unwind': {
      'path': '$tipo', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$unwind': {
      'path': '$observaciones', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$match': {
      '$and': [
        {
          'activo':1
        },
        {
          'tipo.activo': 1
        }, {
          'estado.activo': 1
        }, {
          'observaciones.activo': 1
        }
      ]
    }
  }, {
    '$lookup': {
      'from': 'estadobitacoras', 
      'localField': 'estado.oid', 
      'foreignField': 'oid', 
      'as': 'esBitacora'
    }
  }, {
    '$lookup': {
      'from': 'tipobitacoras', 
      'localField': 'tipo.tid', 
      'foreignField': 'tid', 
      'as': 'tipobitacora'
    }
  }, {
    '$unwind': {
      'path': '$tipobitacora', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$unwind': {
      'path': '$esBitacora', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$project': {
      'tipobitacora': 1, 
      'esBitacora': 1, 
      'observaciones':1,
      'fecha': 1, 
      'etiqueta2': {
        '$filter': {
          'input': '$etiqueta', 
          'as': 'et', 
          'cond': {
            '$eq': [
              '$$et.activo', 1
            ]
          }
        }
      }
    }
  }, {
    '$addFields': {
      'Etiqueta': {
        '$reduce': {
          'input': '$etiqueta2.etiqueta', 
          'initialValue': '', 
          'in': {
            '$cond': {
              'if': {
                '$and': [
                  {
                    '$eq': [
                      {
                        '$indexOfArray': [
                          '$etiqueta', '$$this'
                        ]
                      }, 0
                    ]
                  }
                ]
              }, 
              'then': {
                '$concat': [
                  '$$value', '$$this'
                ]
              }, 
              'else': {
                '$concat': [
                  '$$value', ',', '$$this'
                ]
              }
            }
          }
        }
      }
    }
  }, {
    '$project': {
      'Fecha': {
        '$dateToString': {
          'format': '%d/%m/%Y', 
          'date': '$fecha'
        }
      }, 
      'Hora': {
        '$dateToString': {
          'format': '%H:%M', 
          'date': '$fecha', 
          'timezone': '-0600'
        }
      }, 
      '_id': 1, 
      'RAIDD': '$tipobitacora.tipo', 
      'Estado': '$esBitacora.estado', 
      'Observaciones': '$observaciones.observaciones', 
      'Etiquetas': '$Etiqueta'
    }
  }
]