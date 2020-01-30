import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsResolver } from './fields.resolver';
import { FieldsController } from './fields.controller';

@Module({
  providers: [FieldsService, FieldsResolver],
  controllers: [FieldsController],
  exports: [FieldsService],
})
export class FieldsModule {}
