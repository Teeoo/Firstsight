import { Module } from '@nestjs/common'
import { FieldsResolver } from './fields.resolver'
import { FieldsController } from './fields.controller'
import { LibFieldsModule } from '@app/fields'

@Module({
  imports: [LibFieldsModule],
  providers: [FieldsResolver],
  controllers: [FieldsController],
})
export class FieldsModule {}
