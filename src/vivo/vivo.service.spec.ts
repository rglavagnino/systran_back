import { Test, TestingModule } from '@nestjs/testing';
import { VivoService } from './vivo.service';

describe('VivoService', () => {
  let service: VivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VivoService],
    }).compile();

    service = module.get<VivoService>(VivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
