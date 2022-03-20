import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cart, CartRelations, CoffeeTea} from '../models';
import {CoffeeTeaRepository} from './coffee-tea.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id,
  CartRelations
> {

  public readonly coffeeTeaCart: HasManyRepositoryFactory<CoffeeTea, typeof Cart.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CoffeeTeaRepository') protected coffeeTeaRepositoryGetter: Getter<CoffeeTeaRepository>,
  ) {
    super(Cart, dataSource);
    this.coffeeTeaCart = this.createHasManyRepositoryFactoryFor('coffeeTeaCart', coffeeTeaRepositoryGetter,);
    this.registerInclusionResolver('coffeeTeaCart', this.coffeeTeaCart.inclusionResolver);
  }
}
