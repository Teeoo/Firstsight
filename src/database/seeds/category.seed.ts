import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from '../entity/category.entity';
import * as Faker from 'faker/locale/zh_CN';

export default class CategorySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        {
          label: Faker.helpers.slugify(),
        },
      ])
      .execute();
  }
}
