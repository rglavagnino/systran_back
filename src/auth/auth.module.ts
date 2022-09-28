import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { authSchema } from 'src/models/auth.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[MongooseModule.forFeature([
  {name: 'authSchema', schema:authSchema}
  ])]
})
export class AuthModule {}
