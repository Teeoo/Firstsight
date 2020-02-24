import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Logger,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform {
  public logger = new Logger(ValidationPipe.name)
  public async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (value instanceof Object && Object.keys(value).length <= 0) {
      throw new UnprocessableEntityException('无效数据')
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object, {})
    if (errors.length > 0) {
      const error = errors.shift()
      const constraints = error.constraints
      Object.keys(constraints).forEach(key => {
        throw new BadRequestException(constraints[key])
      })
    }
    return object
  }

  private toValidate(data: any): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => data === type)
  }
}
