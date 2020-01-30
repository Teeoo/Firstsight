import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fields } from '@app/databases/entity/Fields';
import { TreeRepository } from 'typeorm';
import { BaseService } from '@app/shared';

@Injectable()
export class FieldsService extends BaseService<Fields> {
  constructor(
    @InjectRepository(Fields)
    protected readonly repo: TreeRepository<Fields>,
  ) {
    super(repo);
  }
}
