import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { workingSchema } from 'src/models/working.model';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';

@Module({
  controllers: [WorkController],
  providers: [WorkService],
  imports:[
    MongooseModule.forFeature([
      {name:'WorkingSchema', schema:workingSchema}
    ])
  ]
})
export class WorkModule {}
