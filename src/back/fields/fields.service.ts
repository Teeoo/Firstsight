import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { Fields } from '../../database/entity/fields.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../database/entity/article.entity';
import { TreeRepository } from 'typeorm';

@Injectable()
export class FieldsService extends BaseService<Fields> {
  constructor(
    @InjectRepository(Fields)
    protected readonly repo: TreeRepository<Fields>,
  ) {
    super(repo);
  }
}
