import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrdersService from '@modules/orders/services/ListOrdersService';
import { classToClass } from 'class-transformer';

export default class OrdersController {
  // Função para criar um order
  public async create(req: Request, res: Response): Promise<Response> {
    const { client_id, seller_id } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createOrder = container.resolve(CreateOrderService);

    // Executa o service enviando os valores recebidos no body
    const order = await createOrder.execute({
      client_id,
      seller_id,
    });

    // Responde a requisição com o retorno do service
    return res.json(classToClass(order));
  }

  // Função para mostrar os orders cadastrados
  public async show(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersService);

    const orders = await listOrders.execute();

    return res.json(classToClass(orders));
  }
}
