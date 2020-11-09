import { Repository, getRepository } from 'typeorm';

import IOrdersProductsRepository from '@modules/orders/repositories/IOrdersProductsRepository';
import ICreateOrderProductDTO from '@modules/orders/dtos/ICreateOrderProductDTO';
import OrderProduct from '../entities/OrderProduct';

export default class OrdersProductsRepository
  implements IOrdersProductsRepository {
  private ormRepository: Repository<OrderProduct>;

  constructor() {
    this.ormRepository = getRepository(OrderProduct);
  }

  public async create(
    orderData: ICreateOrderProductDTO,
  ): Promise<OrderProduct> {
    const order_product = this.ormRepository.create(orderData);

    await this.ormRepository.save(order_product);

    return order_product;
  }

  public async findOrderProductsByOrderId(
    order_id: string,
  ): Promise<OrderProduct[] | undefined> {
    return this.ormRepository.find({
      where: {
        order_id,
      },
    });
  }

  public async findOrderProductByOrderId(
    order_product_id: string,
  ): Promise<OrderProduct | undefined> {
    return this.ormRepository.findOne({
      where: {
        id: order_product_id,
      },
    });
  }

  public async save(order_product: OrderProduct): Promise<OrderProduct> {
    await this.ormRepository.save(order_product);

    const findOrderProduct = await this.ormRepository.findOne({
      where: {
        id: order_product.id,
      },
      relations: ['product'],
    });

    if (findOrderProduct) {
      return findOrderProduct;
    }
    return this.ormRepository.save(order_product);
  }

  public async delete(order_product_id: string): Promise<void> {
    const order_product = await this.ormRepository.findOne({
      where: {
        id: order_product_id,
      },
    });

    if (order_product) {
      await this.ormRepository.remove(order_product);
    }
  }
}
