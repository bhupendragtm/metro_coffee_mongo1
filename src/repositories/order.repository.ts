import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Order, OrderRelations, CoffeeTea} from '../models';
import {CoffeeTeaRepository} from './coffee-tea.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly coffeTeaOrder: HasManyRepositoryFactory<CoffeeTea, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CoffeeTeaRepository') protected coffeeTeaRepositoryGetter: Getter<CoffeeTeaRepository>,
  ) {
    super(Order, dataSource);
    this.coffeTeaOrder = this.createHasManyRepositoryFactoryFor('coffeTeaOrder', coffeeTeaRepositoryGetter,);
    this.registerInclusionResolver('coffeTeaOrder', this.coffeTeaOrder.inclusionResolver);
  }
}
