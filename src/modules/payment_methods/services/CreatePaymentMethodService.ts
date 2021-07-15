import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import PaymentMethod from '../infra/typeorm/entities/PaymentMethod';
import IPaymentMethodsRepository from '../repositories/IPaymentMethodsRepository';
import ICreatePaymentMethodDTO from '../dtos/ICreatePaymentMethodDTO';

@injectable()
export default class CreatePaymentMethodService {
  constructor(
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  // Função para criar um método de pagamento
  public async execute({
    name,
    first_payment,
    interest_rate,
    split_interval,
    split_max,
  }: ICreatePaymentMethodDTO): Promise<PaymentMethod> {
    const checkIfPaymentMethodExists =
      await this.paymentMethodsRepository.findByName(name);

    if (checkIfPaymentMethodExists) {
      throw new AppError('This payment method already exists', 401);
    }

    const paymentMethod = await this.paymentMethodsRepository.create({
      name,
      first_payment,
      interest_rate,
      split_interval,
      split_max,
    });

    return paymentMethod;
  }
}
