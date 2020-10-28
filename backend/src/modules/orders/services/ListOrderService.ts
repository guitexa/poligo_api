import { inject, injectable } from 'tsyringe';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import User from '@modules/users/infra/typeorm/entities/User';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';
import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';

interface IResponse {
  order: Order | undefined;
  client: Client | undefined;
  products: OrdersProducts[] | undefined;
  seller: User | undefined;
  technical: User | undefined;
}

@injectable()
export default class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(order_id: string): Promise<IResponse> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('This order_id was not found', 404);
    }

    const client = await this.clientsRepository.findById(order.client_id);

    const products = await this.ordersProductsRepository.findOrderProductsByOrderId(
      order_id,
    );

    const seller = await this.usersRepository.findById(order.seller_id);

    const technical = await this.usersRepository.findById(order.technical_id);

    return {
      order,
      client,
      seller,
      technical,
      products,
    };
  }
}
