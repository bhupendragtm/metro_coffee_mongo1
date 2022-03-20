import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CoffeeTea, CoffeeTeaRelations} from '../models';

export class CoffeeTeaRepository extends DefaultCrudRepository<
  CoffeeTea,
  typeof CoffeeTea.prototype.id,
  CoffeeTeaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CoffeeTea, dataSource);
  }
}
