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
  public async execute(
    searchData: ISearchOrderDTO,
  ): Promise<Order[] | undefined> {
    return this.ordersRepository.search(searchData);
  }
}
