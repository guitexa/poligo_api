import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import SplitPaymentWay from '../infra/typeorm/entities/SplitPaymentWay';
import ISplitsPaymentWayRepository from '../repositories/ISplitsPaymentWayRepository';

@injectable()
export default class ListSplitPaymentWayService {
  constructor(
    @inject('SplitsPaymentWayRepository')
    private splitsPaymentWayRepository: ISplitsPaymentWayRepository,
  ) {}

  // Função para mostrar uma única parcela de um pedido específico
  public async execute(
    split_payment_way_id: string,
  ): Promise<SplitPaymentWay | undefined> {
    const splitPaymentWay = await this.splitsPaymentWayRepository.findById(
      split_payment_way_id,
    );

    if (!splitPaymentWay) {
      throw new AppError('This split payment way id was not found', 404);
    }

    return splitPaymentWay;
  }
}
