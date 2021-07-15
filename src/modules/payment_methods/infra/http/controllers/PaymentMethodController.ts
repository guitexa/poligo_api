import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPaymentMethodService from '@modules/payment_methods/services/ListPaymentMethodService';

export default class PaymentMethodController {
  // Função para mostrar um método de pagamento específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { payment_method_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listPaymentMethod = container.resolve(ListPaymentMethodService);

    // Executa o service enviando os valores recebidos no params
    const payment_method = await listPaymentMethod.execute(payment_method_id);

    // Responde a requisição com o retorno do service
    return res.json(payment_method);
  }
}
