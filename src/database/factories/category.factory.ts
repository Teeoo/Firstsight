import { define } from 'typeorm-seeding';
import { Category } from '../entity/category.entity';
import * as Faker from 'faker/locale/zh_CN';

define(Category, (faker: typeof Faker, settings: undefined) => {
  const cate = new Category();
  cate.label = faker.helpers.slugify();
  return cate;
});
