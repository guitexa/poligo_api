import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    client_id,
    seller_id,
  }: ICreateOrderDTO): Promise<Order> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('This client does not exists');
    }

    const seller = await this.usersRepository.findById(seller_id);

    if (!seller) {
      throw new AppError('This seller does not exists');
    }

    return this.ordersRepository.create({
      client_id,
      seller_id,
    });
  }
}
