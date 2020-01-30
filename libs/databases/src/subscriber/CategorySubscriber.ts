import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Category } from '../entity/Category';
import { slugify } from 'transliteration';

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface<Category> {
  public listenTo() {
    return Category;
  }

  public async beforeInsert(
    event: InsertEvent<Category>,
  ): Promise<Promise<any> | void> {
    const { entity } = event;
    entity.slug ?? (entity.slug = slugify(entity.label));
  }

  public async afterInsert(
    event: InsertEvent<Category>,
  ): Promise<Promise<any> | void> {
    await this.cateNum(event);
  }

  public async afterUpdate(
    event: UpdateEvent<Category>,
  ): Promise<Promise<any> | void> {
    await this.cateNum(event);
  }

  public async afterRemove(event: RemoveEvent<Category>) {
    await this.cateNum(event);
  }

  /**
   * @description 计算子分类数量
   * @author lee
   * @date 2020-01-20
   * @param {(InsertEvent<Category> | RemoveEvent<Category>)} event
   * @memberof CategorySubscriber
   */
  public async cateNum(
    event:
      | InsertEvent<Category>
      | RemoveEvent<Category>
      | UpdateEvent<Category>,
  ) {
    const { entity, manager } = event;
    if (entity) {
      const parentId: string = entity.parent as any;
      const parent = await manager.getTreeRepository(Category).findOne({
        id: parentId,
      });
      if (parent) {
        parent.cateNum = await manager.getTreeRepository(Category).count({
          parent: entity.parent,
        });
        manager.getTreeRepository(Category).save(parent);
      }
    }
  }
}
