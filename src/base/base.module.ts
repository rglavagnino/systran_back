import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseSchema } from 'src/models/base.model';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { EstadoBase } from './cat';

@Module({
  controllers: [BaseController],
  providers: [BaseService, EstadoBase],
  imports:[
    MongooseModule.forFeature([
      {name:'BaseSchema', schema:BaseSchema}
    ])
  ]
})
export class BaseModule {}
