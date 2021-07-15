import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import PaymentMethod from '../infra/typeorm/entities/PaymentMethod';
import IPaymentMethodsRepository from '../repositories/IPaymentMethodsRepository';

@injectable()
export default class ListPaymentMethodService {
  constructor(
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  // Função para procurar um método de pagamento específico
  public async execute(
    payment_method_id: string,
  ): Promise<PaymentMethod | undefined> {
    const paymentMethod = await this.paymentMethodsRepository.findById(
      payment_method_id,
    );

    if (!paymentMethod) {
      throw new AppError('This payment method_id was not found', 404);
    }

    return paymentMethod;
  }
}
