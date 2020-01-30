import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Inject,
  Req,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthorizationGuard } from '@app/core';

@UseGuards(new AuthorizationGuard())
@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return file;
  }
}
