import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class LibCategoryModule {}
