import { Test, TestingModule } from '@nestjs/testing';
import { RaiddService } from './raidd.service';

describe('RaiddService', () => {
  let service: RaiddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaiddService],
    }).compile();

    service = module.get<RaiddService>(RaiddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
