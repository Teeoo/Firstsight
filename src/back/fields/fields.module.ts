import { forwardRef, Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fields } from '../../database/entity/fields.entity';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fields]),
    forwardRef(() => ArticleModule),
  ],
  exports: [FieldsService],
  providers: [FieldsService],
})
export class FieldsModule {}
