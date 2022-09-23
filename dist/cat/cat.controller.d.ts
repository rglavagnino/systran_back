import { CatService } from './cat.service';
import { Response } from 'express';
export declare class CatController {
    private readonly catsrv;
    constructor(catsrv: CatService);
    crearCatalogo(res: Response): Promise<void>;
}
