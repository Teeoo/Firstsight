import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../database/entity/category.entity';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => ArticleModule),
  ],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
