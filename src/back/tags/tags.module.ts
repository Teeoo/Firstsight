import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TagsController } from './tags.controller';

@Module({
  providers: [TagsService, TagsResolver],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
