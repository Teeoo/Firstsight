import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { slugify } from 'transliteration';
import { Tags } from '../entity/tags.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Tags> {
  public listenTo() {
    return Tags;
  }

  public async beforeInsert(
    event: InsertEvent<Tags>,
  ): Promise<Promise<any> | void> {
    if (event.entity && !event.entity.color) {
      const random = `#${Math.random()
        .toString(16)
        .substr(2, 6)}`;
      event.entity.color = random;
      event.entity.slug = Object.assign(event.entity, {
        slug: slugify(event.entity.label),
      }).slug;
    }
  }
}
