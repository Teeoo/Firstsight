import { Injectable } from '@nestjs/common'
import { CrudService } from '@app/core/crud/crud.service'
import { Category } from './category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'

@Injectable()
export class CategoryService extends CrudService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repo: TreeRepository<Category>,
  ) {
    super(repo)
  }
}
