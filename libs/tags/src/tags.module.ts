import { Module } from '@nestjs/common'
import { TagsService } from './tags.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tags } from './tags.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  providers: [TagsService],
  exports: [TagsService],
})
export class LibTagsModule {}
