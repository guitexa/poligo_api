import { Repository, getRepository } from 'typeorm';

import IPaymentMethodsRepository from '@modules/payment_methods/repositories/IPaymentMethodsRepository';
import ICreatePaymentMethodDTO from '@modules/payment_methods/dtos/ICreatePaymentMethodDTO';
import PaymentMethod from '@modules/payment_methods/infra/typeorm/entities/PaymentMethod';

export default class PaymentMethodsRepository
  implements IPaymentMethodsRepository
{
  private ormRepository: Repository<PaymentMethod>;

  constructor() {
    this.ormRepository = getRepository(PaymentMethod);
  }

  // Função para criar um método de pagamento
  public async create(
    paymentMethodData: ICreatePaymentMethodDTO,
  ): Promise<PaymentMethod> {
    const paymentMethod = this.ormRepository.create(paymentMethodData);

    await this.ormRepository.save(paymentMethod);

    return paymentMethod;
  }

  // Função para mostrar todos os métodos de pagamentos cadastrados
  public async findAll(): Promise<PaymentMethod[] | undefined> {
    return this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  // Função para procurar um método de pagamento específico pelo ID
  public async findById(
    paymentMethod_id: string,
  ): Promise<PaymentMethod | undefined> {
    const paymentMethod = await this.ormRepository.findOne({
      where: {
        id: paymentMethod_id,
      },
    });

    return paymentMethod;
  }

  // Função para procurar um método de pagamento específico pelo nome
  public async findByName(
    paymentMethod_name: string,
  ): Promise<PaymentMethod | undefined> {
    const paymentMethod = await this.ormRepository.findOne({
      where: {
        name: paymentMethod_name,
      },
    });

    return paymentMethod;
  }
}
