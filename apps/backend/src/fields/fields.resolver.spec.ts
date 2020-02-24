import { Test, TestingModule } from '@nestjs/testing';
import { FieldsResolver } from './fields.resolver';

describe('FieldsResolver', () => {
  let resolver: FieldsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldsResolver],
    }).compile();

    resolver = module.get<FieldsResolver>(FieldsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
