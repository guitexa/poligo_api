import { Repository, getRepository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(orderData);

    await this.ormRepository.save(order);

    return order;
  }

  public async findAll(): Promise<Order[] | undefined> {
    return this.ormRepository.find({
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });
  }

  public async findById(order_id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id: order_id,
      },
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });

    return order;
  }

  public async findByIdWithoutRelations(
    order_id: string,
  ): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id: order_id,
      },
    });

    return order;
  }

  public async save(order: Order): Promise<Order> {
    await this.ormRepository.save(order);

    const findOrder = await this.ormRepository.findOne({
      where: {
        id: order.id,
      },
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });

    if (findOrder) {
      return findOrder;
    }
    return this.ormRepository.save(order);
  }
}
