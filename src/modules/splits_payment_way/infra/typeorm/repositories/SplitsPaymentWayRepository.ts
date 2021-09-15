import { Repository, getRepository } from 'typeorm';

import ISplitsPaymentWayRepository from '@modules/splits_payment_way/repositories/ISplitsPaymentWayRepository';
import ICreateSplitPaymentWayDTO from '@modules/splits_payment_way/dtos/ICreateSplitPaymentWayDTO';
import SplitPaymentWay from '@modules/splits_payment_way/infra/typeorm/entities/SplitPaymentWay';

export default class SplitsPaymentWayRepository
  implements ISplitsPaymentWayRepository
{
  private ormRepository: Repository<SplitPaymentWay>;

  constructor() {
    this.ormRepository = getRepository(SplitPaymentWay);
  }

  // Função para criar um parcelamento
  public async create(
    splitPaymentWayData: ICreateSplitPaymentWayDTO,
  ): Promise<SplitPaymentWay> {
    const splitPaymentWay = this.ormRepository.create(splitPaymentWayData);

    await this.ormRepository.save(splitPaymentWay);

    return splitPaymentWay;
  }

  // Função para mostrar as parcelas de um pedido específico
  public async findAllFromOrderId(
    order_id: string,
  ): Promise<SplitPaymentWay[] | undefined> {
    return this.ormRepository.find({
      where: {
        order_id,
      },
      relations: ['payment_method'],
    });
  }

  // Função para mostrar uma única parcela de um pedido específico
  public async findById(
    split_payment_way_id: string,
  ): Promise<SplitPaymentWay | undefined> {
    const splitPaymentWay = await this.ormRepository.findOne({
      where: {
        id: split_payment_way_id,
      },
    });

    return splitPaymentWay;
  }

  // Função para deletar um order_product específico
  public async delete(
    order_id: string,
  ): Promise<SplitPaymentWay[] | undefined> {
    const splitPaymentWay = await this.ormRepository.find({
      where: {
        order_id,
      },
    });

    if (splitPaymentWay) {
      return this.ormRepository.remove(splitPaymentWay);
    }

    return undefined;
  }
}
