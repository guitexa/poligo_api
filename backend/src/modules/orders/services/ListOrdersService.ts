import { inject, injectable } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
export default class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<Order[] | undefined> {
    return this.ordersRepository.findAll();
  }
}
