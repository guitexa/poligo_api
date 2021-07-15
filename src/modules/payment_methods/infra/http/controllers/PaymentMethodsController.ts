import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePaymentMethodService from '@modules/payment_methods/services/CreatePaymentMethodService';
import ListPaymentMethodsService from '@modules/payment_methods/services/ListPaymentMethodsService';

export default class PaymentMethodsController {
  // Função para criar um método de pagamento
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, first_payment, interest_rate, split_interval, split_max } =
      req.body;

    // Realiza injeção de dependência para utilizar o service
    const createPaymentMethod = container.resolve(CreatePaymentMethodService);

    // Executa o service enviando os valores recebidos no params
    const payment_method = await createPaymentMethod.execute({
      name,
      first_payment,
      interest_rate,
      split_interval,
      split_max,
    });

    // Responde a requisição com o retorno do service
    return res.json(payment_method);
  }

  // Função para mostrar os métodos de pagamentos cadastrados
  public async show(req: Request, res: Response): Promise<Response> {
    // Realiza injeção de dependência para utilizar o service
    const listPaymentMethods = container.resolve(ListPaymentMethodsService);

    // Executa o service
    const payment_method = await listPaymentMethods.execute();

    // Responde a requisição com o retorno do service
    return res.json(payment_method);
  }
}
