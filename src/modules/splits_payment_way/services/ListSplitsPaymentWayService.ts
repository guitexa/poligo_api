import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import SplitPaymentWay from '../infra/typeorm/entities/SplitPaymentWay';
import ISplitsPaymentWayRepository from '../repositories/ISplitsPaymentWayRepository';

@injectable()
export default class ListSplitsPaymentWayService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('SplitsPaymentWayRepository')
    private splitsPaymentWayRepository: ISplitsPaymentWayRepository,
  ) {}

  // Função para mostrar as parcelas de um pedido específico
  public async execute(
    order_id: string,
  ): Promise<SplitPaymentWay[] | undefined> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('This order id was not found', 404);
    }

    return this.splitsPaymentWayRepository.findAllFromOrderId(order_id);
  }
}
