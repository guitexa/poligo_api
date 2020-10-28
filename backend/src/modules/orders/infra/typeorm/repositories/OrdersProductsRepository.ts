import { Repository, getRepository } from 'typeorm';

import IOrdersProductsRepository from '@modules/orders/repositories/IOrdersProductsRepository';
import ICreateOrdersProductsDTO from '@modules/orders/dtos/ICreateOrdersProductsDTO';
import OrdersProducts from '../entities/OrdersProducts';

export default class OrdersProductsRepository
  implements IOrdersProductsRepository {
  private ormRepository: Repository<OrdersProducts>;

  constructor() {
    this.ormRepository = getRepository(OrdersProducts);
  }

  public async create(
    orderData: ICreateOrdersProductsDTO,
  ): Promise<OrdersProducts> {
    const order_products = this.ormRepository.create(orderData);

    await this.ormRepository.save(order_products);

    return order_products;
  }

  public async findOrderProductsByOrderId(
    order_id: string,
  ): Promise<OrdersProducts[] | undefined> {
    return this.ormRepository.find({
      where: {
        order_id,
      },
    });
  }
}
