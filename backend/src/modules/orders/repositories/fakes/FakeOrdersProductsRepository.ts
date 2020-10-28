import { uuid } from 'uuidv4';

import ICreateOrdersProductsDTO from '@modules/orders/dtos/ICreateOrdersProductsDTO';
import OrdersProducts from '../../infra/typeorm/entities/OrdersProducts';
import IOrdersProductsRepository from '../IOrdersProductsRepository';

export default class FakeOrdersProductsRepository
  implements IOrdersProductsRepository {
  private ordersProductsRepository: OrdersProducts[] = [];

  public async create(
    orderData: ICreateOrdersProductsDTO,
  ): Promise<OrdersProducts> {
    const order = new OrdersProducts();

    Object.assign(order, { id: uuid() }, orderData);

    this.ordersProductsRepository.push(order);

    return order;
  }

  public async findOrderProductsByOrderId(
    order_id: string,
  ): Promise<OrdersProducts[] | undefined> {
    const order = this.ordersProductsRepository.filter(
      ord => ord.order.id === order_id,
    );

    return order;
  }
}
