import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import IFindAllOrderDTO from '../dtos/IFindAllOrderDTO';

@injectable()
export default class ListOrdersWithErrorsService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Função para procurar todas as orders cadastradas
  public async execute(data: IFindAllOrderDTO): Promise<Order[] | undefined> {
    return this.ordersRepository.findAllWithErrors(data);
  }
}
