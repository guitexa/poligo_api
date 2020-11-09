import { uuid } from 'uuidv4';

import ICreateOrderProductDTO from '@modules/orders/dtos/ICreateOrderProductDTO';
import OrderProduct from '../../infra/typeorm/entities/OrderProduct';
import IOrdersProductsRepository from '../IOrdersProductsRepository';

export default class FakeOrdersProductsRepository
  implements IOrdersProductsRepository {
  private ordersProductsRepository: OrderProduct[] = [];

  public async create(
    orderData: ICreateOrderProductDTO,
  ): Promise<OrderProduct> {
    const order = new OrderProduct();

    Object.assign(order, { id: uuid() }, orderData);

    this.ordersProductsRepository.push(order);

    return order;
  }

  public async findOrderProductsByOrderId(
    order_id: string,
  ): Promise<OrderProduct[] | undefined> {
    const order = this.ordersProductsRepository.filter(
      ord => ord.order.id === order_id,
    );

    return order;
  }

  public async findOrderProductByOrderId(
    order_product_id: string,
  ): Promise<OrderProduct | undefined> {
    const order = this.ordersProductsRepository.find(
      ord => ord.id === order_product_id,
    );

    return order;
  }

  public async save(order_product: OrderProduct): Promise<OrderProduct> {
    return order_product;
  }

  public async delete(order_product_id: string): Promise<void> {
    this.ordersProductsRepository.filter(
      order_product => order_product.id !== order_product_id,
    );
  }
}
