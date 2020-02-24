import { Module } from '@nestjs/common'
import { FieldsService } from './fields.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Fields } from './fields.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Fields])],
  providers: [FieldsService],
  exports: [FieldsService],
})
export class LibFieldsModule {}
