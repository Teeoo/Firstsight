import { forwardRef, Module } from '@nestjs/common';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from '../../database/entity/tags.entity';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tags]), forwardRef(() => ArticleModule)],
  providers: [TagsResolver, TagsService],
  exports: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
