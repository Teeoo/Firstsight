import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { User } from '../entity/User';
import { genSalt, hash } from 'bcrypt';
import * as gravitas from 'gravatar';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  public listenTo() {
    return User;
  }

  public async beforeInsert(
    event: InsertEvent<User>,
  ): Promise<Promise<any> | void> {
    const salt = await genSalt();
    event.entity.salt = salt;
    event.entity.password = await hash(event.entity.password, salt);
    event.entity.screenName = event.entity.screenName ?? event.entity.name;
    event.entity.avatar = gravitas.url(
      event.entity.email,
      { s: '100', r: 'x', d: 'retro' },
      true,
    );
  }
}
