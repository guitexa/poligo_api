import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import IFindAllOrdersDTO from '../dtos/IFindAllOrdersDTO';

@injectable()
export default class ListOrdersWithErrorsService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Função para procurar todas as orders cadastradas
  public async execute(data: IFindAllOrdersDTO): Promise<Order[] | undefined> {
    return this.ordersRepository.findAllWithErrors(data);
  }
}
