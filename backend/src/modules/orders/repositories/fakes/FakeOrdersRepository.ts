import { uuid } from 'uuidv4';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../../infra/typeorm/entities/Order';

export default class FakeOrdersRepository implements IOrdersRepository {
  private orderRepository: Order[] = [];

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, { id: uuid() }, orderData);

    this.orderRepository.push(order);

    return order;
  }

  public async findAll(): Promise<Order[] | undefined> {
    return this.orderRepository;
  }

  public async findById(order_id: string): Promise<Order | undefined> {
    return this.orderRepository.find(ord => ord.id === order_id);
  }

  public async findByIdWithoutRelations(
    order_id: string,
  ): Promise<Order | undefined> {
    return this.orderRepository.find(ord => ord.id === order_id);
  }

  public async save(order: Order): Promise<Order> {
    return order;
  }

  public async search(): Promise<Order[] | undefined> {
    return this.orderRepository;
  }
}
