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
  Order,
  CoffeeTea,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderCoffeeTeaController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Array of Order has many CoffeeTea',
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
    return this.orderRepository.coffeTeaOrder(id).find(filter);
  }

  @post('/orders/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(CoffeeTea)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoffeeTea, {
            title: 'NewCoffeeTeaInOrder',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) coffeeTea: Omit<CoffeeTea, 'id'>,
  ): Promise<CoffeeTea> {
    return this.orderRepository.coffeTeaOrder(id).create(coffeeTea);
  }

  @patch('/orders/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Order.CoffeeTea PATCH success count',
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
    return this.orderRepository.coffeTeaOrder(id).patch(coffeeTea, where);
  }

  @del('/orders/{id}/coffee-teas', {
    responses: {
      '200': {
        description: 'Order.CoffeeTea DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CoffeeTea)) where?: Where<CoffeeTea>,
  ): Promise<Count> {
    return this.orderRepository.coffeTeaOrder(id).delete(where);
  }
}
