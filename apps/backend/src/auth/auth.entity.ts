import { Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string
}
