import { Test, TestingModule } from '@nestjs/testing';
import { UploadsResolver } from './uploads.resolver';

describe('UploadsResolver', () => {
  let resolver: UploadsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadsResolver],
    }).compile();

    resolver = module.get<UploadsResolver>(UploadsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
