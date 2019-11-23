import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../database/entity/category.entity';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
