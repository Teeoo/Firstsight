import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Category } from '../entity/category.entity';
import { slugify } from 'transliteration';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Category> {
  public listenTo() {
    return Category;
  }

  // public beforeInsert(event: InsertEvent<any>) {
  //   console.log(`BEFORE ENTITY INSERTED: `, event.entity);
  // }
  //
  // public beforeUpdate(event: UpdateEvent<any>) {
  //   console.log(`BEFORE ENTITY UPDATED: `, event.entity);
  // }

  //
  // public afterInsert(event: InsertEvent<any>) {
  //   console.log(`AFTER ENTITY INSERTED: `, event.entity);
  // }
  //
  // public afterUpdate(event: UpdateEvent<any>) {
  //   console.log(`AFTER ENTITY UPDATED: `, event.entity);
  // }

  //
  // public afterLoad(entity: any) {
  //   console.log(`AFTER ENTITY LOADED: `, entity);
  // }

  public async beforeInsert(
    event: InsertEvent<Category>,
  ): Promise<Promise<any> | void> {
    await this.handleChange(event.entity);
  }

  // public async afterUpdate(event: UpdateEvent<Category>): Promise<Promise<any> | void> {
  //   console.info('修改');
  //   if (event.entity) {
  //     await this.handleChange(event.entity);
  //   }
  // }

  private async handleChange(entity: Category) {
    if (entity && !entity.slug) {
      const slug = entity.slug;
      entity.slug = Object.assign(entity, { slug: slugify(entity.label) }).slug;
    }
  }
}
