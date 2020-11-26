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

  // Função para procurar informações dentro das orders existentes
  public async execute({
    created_at,
    delivery_date,
    ...rest
  }: ISearchOrderDTO): Promise<Order[] | undefined> {
    const created_at_year = new Date(created_at || '').getFullYear();
    const created_at_month = new Date(created_at || '').getMonth();
    const created_at_day = new Date(created_at || '').getDate();

    const delivery_date_year = new Date(delivery_date || '').getFullYear();
    const delivery_date_month = new Date(delivery_date || '').getMonth();
    const delivery_date_day = new Date(delivery_date || '').getDate();

    return this.ordersRepository.search({
      created_at: new Date(created_at_year, created_at_month, created_at_day),
      delivery_date: new Date(
        delivery_date_year,
        delivery_date_month,
        delivery_date_day,
      ),
      ...rest,
    });
  }
}
