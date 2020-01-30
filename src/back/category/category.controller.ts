import { Controller, UseGuards } from '@nestjs/common';
import { Category } from '@app/databases/entity/Category';
import { AuthorizationGuard } from '@app/core';
import { BaseController } from '@app/shared';
import { CategoryService } from './category.service';

@UseGuards(new AuthorizationGuard())
@Controller('category')
export class CategoryController extends BaseController<Category> {
  constructor(protected readonly service: CategoryService) {
    super(service);
  }
}
