import { Test, TestingModule } from '@nestjs/testing';
import { LinksResolver } from './links.resolver';

describe('LinksResolver', () => {
  let resolver: LinksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinksResolver],
    }).compile();

    resolver = module.get<LinksResolver>(LinksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
