import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  client_id: string;
  seller_id: string;
}

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

  public async execute({ client_id, seller_id }: IRequest): Promise<Order> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('This client_id was not found', 404);
    }

    const seller = await this.usersRepository.findById(seller_id);

    if (!seller) {
      throw new AppError('This seller_id was not found', 404);
    }

    return this.ordersRepository.create({
      client_id,
      seller_id,
      status_order: 'Rascunho',
      status_delivery: '',
      status_billing: '',
      status_payment: '',
      delivery_conditions: '',
      payment_way: '',
      due_date: '',
    });
  }
}
