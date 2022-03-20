import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CoffeeTea extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'number',
    required: true,
  })
  price1: number;

  @property({
    type: 'string',
    default: Your Image Name Goes Here!,
  })
  image?: string;

  @property({
    type: 'boolean',
  })
  trending_status?: boolean;

  @property({
    type: 'string',
  })
  reviews?: string;

  @property({
    type: 'string',
  })
  cartId?: string;

  @property({
    type: 'string',
  })
  orderId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CoffeeTea>) {
    super(data);
  }
}

export interface CoffeeTeaRelations {
  // describe navigational properties here
}

export type CoffeeTeaWithRelations = CoffeeTea & CoffeeTeaRelations;
