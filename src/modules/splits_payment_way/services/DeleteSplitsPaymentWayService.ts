import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SplitPaymentWay from '../infra/typeorm/entities/SplitPaymentWay';

import ISplitsPaymentWayRepository from '../repositories/ISplitsPaymentWayRepository';

@injectable()
export default class DeleteSplitsPaymentWayService {
  constructor(
    @inject('SplitsPaymentWayRepository')
    private splitsPaymentWayRepository: ISplitsPaymentWayRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Função para mostrar uma única parcela de um pedido específico
  public async execute(
    order_id: string,
  ): Promise<SplitPaymentWay[] | undefined> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('This order id was not found', 404);
    }

    const splitsPaymentWay =
      await this.splitsPaymentWayRepository.findAllFromOrderId(order_id);

    if (!splitsPaymentWay?.length) {
      throw new AppError('This order id has no splits');
    }

    // Remove o valor do payment_way
    order.payment_way = '';

    // Atualiza o payment_way da order
    await this.ordersRepository.save(order);

    return this.splitsPaymentWayRepository.delete(order_id);
  }
}
