import { Test, TestingModule } from '@nestjs/testing';
import { RaiddController } from './raidd.controller';

describe('RaiddController', () => {
  let controller: RaiddController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaiddController],
    }).compile();

    controller = module.get<RaiddController>(RaiddController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
