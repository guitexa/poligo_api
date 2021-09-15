import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSplitPaymentWayService from '@modules/splits_payment_way/services/ListSplitPaymentWayService';

export default class SplitPaymentWayController {
  // Função para mostrar uma única parcela de um pedido específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { split_payment_way_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listSplitPaymentWay = container.resolve(ListSplitPaymentWayService);

    // Executa o service enviando os valores recebidos no params
    const split_payment_way = await listSplitPaymentWay.execute(
      split_payment_way_id,
    );

    // Responde a requisição com o retorno do service
    return res.json(split_payment_way);
  }
}
