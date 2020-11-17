import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import ISearchOrderDTO from '../dtos/ISearchOrderDTO';

@injectable()
export default class SearchOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    created_at,
    ...rest
  }: ISearchOrderDTO): Promise<Order[] | undefined> {
    const year = new Date(created_at || '').getFullYear();
    const month = new Date(created_at || '').getMonth();
    const day = new Date(created_at || '').getDate();

    return this.ordersRepository.search({
      created_at: new Date(year, month, day),
      ...rest,
    });
  }
}
