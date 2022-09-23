import { Test, TestingModule } from '@nestjs/testing';
import { VivoController } from './vivo.controller';

describe('VivoController', () => {
  let controller: VivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VivoController],
    }).compile();

    controller = module.get<VivoController>(VivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
