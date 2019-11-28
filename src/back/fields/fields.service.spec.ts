import { Test, TestingModule } from '@nestjs/testing';
import { FieldsService } from './fields.service';

describe('FieldsService', () => {
  let service: FieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldsService],
    }).compile();

    service = module.get<FieldsService>(FieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
