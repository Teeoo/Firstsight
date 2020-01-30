import { Module, forwardRef } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsResolver } from './uploads.resolver';
import { UploadsController } from './uploads.controller';
import { CommonModule } from '@app/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [UploadsService, UploadsResolver],
  controllers: [UploadsController],
})
export class UploadsModule {}
