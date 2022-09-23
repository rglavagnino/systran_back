import { Controller,Get ,Put, Body, Res, Headers,HttpStatus,Patch,Delete,Param } from '@nestjs/common';
import { crearSalida, logger, obtenerTipo } from 'src/utils/salida';
import { RaiddService } from './raidd.service';
import { Response } from 'express'
import { salida } from 'src/utils/salida.model';

@Controller('bitacora')
export class RaiddController {
    constructor(
        private readonly raidSrv: RaiddService
    ){}




    @Patch('obs')
    async actualizarObservaciones(
        @Headers('Authorization') token:string
        ,@Res() res: Response
        ,@Body('id') id:string
        ,@Body('observacion') obs:string
        ,@Body('usuario') usuario:string
    )
    {
        if ( !token ){
            return res.status(HttpStatus.FORBIDDEN).json({})
        }
        
        if (token !== 'DTSI IS GAH'){
            return res.status(HttpStatus.FORBIDDEN).json({})
        }

        const resul =  await this.raidSrv.actualizarObservacion(id,obs,usuario)
        const status = this.obtenerStatusHttp(resul)
        return res.status(status).json(resul)
    }

    /**
     *  ANCHOR Eliminar etiqueta
     * @param token 
     * @param res 
     * @param id id de el elemento 
     * @returns 
     */
    @Delete('etiqueta')
    async eliminarEtiqueta(
        @Headers('Authorization') token:string
        ,@Res() res: Response
        ,@Body('id') id:string
        ,@Body('etiqueta') etiqueta:string
        ,@Body('usuario') usuario:string
    ){
        if ( !token ){
            return res.status(HttpStatus.FORBIDDEN).json({})
        }
        
        if (token !== 'DTSI IS GAH'){
            return res.status(HttpStatus.FORBIDDEN).json({})
        }

        const resul =  await this.raidSrv.eliminarEtiqueta(id,etiqueta,usuario)
        const status = this.obtenerStatusHttp(resul)
        return res.status(status).json(resul)
        }


        @Put('etiqueta')
        async insertarEtiqueta(
            @Headers('Authorization') token:string
            ,@Res() res: Response
            ,@Body('id') id:string
            ,@Body('etiqueta') etiqueta:string
            ,@Body('usuario') usuario:string
        ){
            if ( !token ){
                return res.status(HttpStatus.FORBIDDEN).json({})
            }
            
            if (token !== 'DTSI IS GAH'){
                return res.status(HttpStatus.FORBIDDEN).json({})
            }
    
            const resul =  await this.raidSrv.insertarEtiqueta(id,etiqueta,usuario)
            const status = this.obtenerStatusHttp(resul)
            return res.status(status).json(resul)
            }




/**
 * ANCHOR Obtener elementos de la bitacora
 * @param token 
 * @param usuario 
 * @param res 
 * @returns 
 */
    @Get()
    async obtenerElementoBitacora(
        @Headers('Authorization') token:string
        ,@Body('usuario') usuario:string
        ,@Res() res: Response
    ){
        if (!usuario){
            return res.status(HttpStatus.FORBIDDEN).json({})
        }
        const resul =  await this.raidSrv.obtenerTodosElementosBitacora(usuario)
        return res.status(HttpStatus.OK).json(resul)
    }

    @Put()
    async insertarElementoBitacora(
        @Body('observacion') obs:string
        ,@Body('tipo') tipo:number
        ,@Body('etiquetas') etiqueta:string
        ,@Body('usuario') usuario:string
        ,@Headers('Authorization') token:string
        ,@Res() res: Response
    ){
        try{
            if (token === 'DTSI IS GAH'){
            const resul = await this.raidSrv.insertarElemento(obs,tipo,etiqueta,usuario)
            let status;
            if (resul.tipo === 'Info' || resul.tipo === 'Exito')
                status = HttpStatus.OK
            else
                status = HttpStatus.INTERNAL_SERVER_ERROR
            res.status(status).json(resul)

            } 
            else 
            {
                logger('Intentando insertar una bitacora sin acceso')
                const sal = crearSalida('No esta autorizado para ingresar una bitacora',obtenerTipo(3),'',[])
                res.status(HttpStatus.FORBIDDEN).json(sal)
            }
        }catch(ex){
            const msg='Error en estructura de mensaje, revisar documentacion'
            const msg2 = 'No se puede insertar elemento de bitacora'
            const sal = crearSalida(msg2,obtenerTipo(3),msg2,[])
            logger('Error al intentar crear un elemento de bitacora')
            res.status(HttpStatus.BAD_REQUEST).json(sal)
        }
    }

/**
 * Se prepara la salida con su codigo
 * @param resul la salida deseada
 */
    private obtenerStatusHttp(resul:salida){
       
        let status;
        if (!resul)
            return HttpStatus.BAD_REQUEST
        if (resul.tipo === 'Info' || resul.tipo === 'Exito')
            status = HttpStatus.OK
        else
            status = HttpStatus.INTERNAL_SERVER_ERROR
        return status
    }
}
