import { Module } from '@nestjs/common';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from '../../database/entity/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  providers: [TagsResolver, TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
