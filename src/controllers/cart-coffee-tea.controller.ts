import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cart,
  CoffeeTea,
} from '../models';
import {CartRepository} from '../repositories';

export class CartCoffeeTeaController {
  constructor(
    @repository(CartRepository) protected cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Array of Cart has many CoffeeTea',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CoffeeTea)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CoffeeTea>,
  ): Promise<CoffeeTea[]> {
    return this.cartRepository.coffeeTeaCart(id).find(filter);
  }

  @post('/carts/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Cart model instance',
        content: {'application/json': {schema: getModelSchemaRef(CoffeeTea)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cart.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoffeeTea, {
            title: 'NewCoffeeTeaInCart',
            exclude: ['id'],
            optional: ['cartId']
          }),
        },
      },
    }) coffeeTea: Omit<CoffeeTea, 'id'>,
  ): Promise<CoffeeTea> {
    return this.cartRepository.coffeeTeaCart(id).create(coffeeTea);
  }

  @patch('/carts/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Cart.CoffeeTea PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoffeeTea, {partial: true}),
        },
      },
    })
    coffeeTea: Partial<CoffeeTea>,
    @param.query.object('where', getWhereSchemaFor(CoffeeTea)) where?: Where<CoffeeTea>,
  ): Promise<Count> {
    return this.cartRepository.coffeeTeaCart(id).patch(coffeeTea, where);
  }

  @del('/carts/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Cart.CoffeeTea DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CoffeeTea)) where?: Where<CoffeeTea>,
  ): Promise<Count> {
    return this.cartRepository.coffeeTeaCart(id).delete(where);
  }
}
