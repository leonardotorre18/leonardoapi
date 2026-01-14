import { Test, TestingModule } from '@nestjs/testing';
import { VercelBlobStorageService } from './vercel-blob-storage.service';

describe('VercelBlobStorageService', () => {
  let service: VercelBlobStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VercelBlobStorageService],
    }).compile();

    service = module.get<VercelBlobStorageService>(VercelBlobStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
