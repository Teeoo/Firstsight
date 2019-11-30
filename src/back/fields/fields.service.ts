import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { Fields } from '../../database/entity/fields.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

@Injectable()
export class FieldsService extends BaseService<Fields> {
  /**
   * Creates an instance of FieldsService.
   * @param {TreeRepository<Fields>} repo
   * @memberof FieldsService
   */
  constructor(
    @InjectRepository(Fields)
    protected readonly repo: TreeRepository<Fields>,
  ) {
    super(repo);
  }
}
