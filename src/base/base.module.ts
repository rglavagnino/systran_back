import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseSchema } from 'src/models/base.model';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

@Module({
  controllers: [BaseController],
  providers: [BaseService],
  imports:[
    MongooseModule.forFeature([
      {name:'BaseSchema', schema:BaseSchema}
    ])
  ]
})
export class BaseModule {}
