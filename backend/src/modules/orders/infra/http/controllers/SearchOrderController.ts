import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchOrderService from '@modules/orders/services/SearchOrderService';
import { classToClass } from 'class-transformer';

export default class SearchOrderController {
  // Função para buscar informações dentro dos pedidos
  public async show(req: Request, res: Response): Promise<Response> {
    const searchData = req.query;

    // Realiza injeção de dependência para utilizar o service
    const searchOrder = container.resolve(SearchOrderService);

    // Executa o service enviando os valores recebidos no query
    const orders = await searchOrder.execute(searchData);

    // Responde a requisição com o retorno do service
    return res.json(classToClass(orders));
  }
}
