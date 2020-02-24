import { Field, InputType } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import { Fields } from './fields.entity'

@InputType({ description: 'Create a fields input' })
export class NewFieldsInput implements Partial<Fields> {
  @Field({ description: '字段名' })
  @IsNotEmpty({ message: '字段名不能为空' })
  public name: string

  @Field({ description: '字段类型' })
  @IsNotEmpty({ message: '字段类型不能为空' })
  public type: string

  @Field({ description: '值' })
  @IsNotEmpty({ message: '值不能为空' })
  public value: string
}

@InputType({ description: 'update Field data' })
export class UpdateFieldsInput extends NewFieldsInput
  implements Partial<Fields> {}
