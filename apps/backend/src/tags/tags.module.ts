import { Module } from '@nestjs/common'
import { TagsResolver } from './tags.resolver'
import { TagsController } from './tags.controller'
import { LibTagsModule } from '@app/tags'

@Module({
  imports: [LibTagsModule],
  providers: [TagsResolver],
  controllers: [TagsController],
})
export class TagsModule {}
