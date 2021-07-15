import { inject, injectable } from 'tsyringe';

import PaymentMethod from '../infra/typeorm/entities/PaymentMethod';
import IPaymentMethodsRepository from '../repositories/IPaymentMethodsRepository';

@injectable()
export default class ListPaymentMethodsService {
  constructor(
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  // Função para procurar todos os métodos de pagamentos cadastrados
  public async execute(): Promise<PaymentMethod[] | undefined> {
    return this.paymentMethodsRepository.findAll();
  }
}
