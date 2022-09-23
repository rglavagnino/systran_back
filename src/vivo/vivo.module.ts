import { Module } from '@nestjs/common';
import { VivoController } from './vivo.controller';
import { VivoService } from './vivo.service';

@Module({
  controllers: [VivoController],
  providers: [VivoService]
})
export class VivoModule {}
