import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryService, CategoryResolver],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
