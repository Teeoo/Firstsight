import { registerEnumType } from 'type-graphql';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderBy, {
  name: 'OrderBy',
  description: 'The basic directions',
});
