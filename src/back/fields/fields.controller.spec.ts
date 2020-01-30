import { Test, TestingModule } from '@nestjs/testing';
import { FieldsController } from './fields.controller';

describe('Fields Controller', () => {
  let controller: FieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldsController],
    }).compile();

    controller = module.get<FieldsController>(FieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
