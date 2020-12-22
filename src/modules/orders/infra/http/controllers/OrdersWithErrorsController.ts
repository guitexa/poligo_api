import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrdersWithErrorsService from '@modules/orders/services/ListOrdersWithErrorsService';
import { classToClass } from 'class-transformer';

export default class OrdersWithErrorsController {
  // Função para mostrar as orders cadastradas que possuem erros
  public async show(req: Request, res: Response): Promise<Response> {
    const data = req.query;

    // Realiza injeção de dependência para utilizar o service
    const listOrders = container.resolve(ListOrdersWithErrorsService);

    // Executa o service enviando os valores recebidos na query
    const orders = await listOrders.execute(data);

    // Responde a requisição com o retorno do service
    return res.json(classToClass(orders));
  }
}
