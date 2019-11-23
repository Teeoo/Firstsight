import { OrderBy } from './base.enum';

export interface Sort {
  field: string;
  order: OrderBy;
}

export interface ObjectLiteral {
  [key: string]: any;
}
