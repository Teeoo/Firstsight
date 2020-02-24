import { Module } from '@nestjs/common'
import { LinksService } from './links.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Links } from './links.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  providers: [LinksService],
  exports: [LinksService],
})
export class LibLinksModule {}
