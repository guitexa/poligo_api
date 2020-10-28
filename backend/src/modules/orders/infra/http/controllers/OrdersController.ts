import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrdersService from '@modules/orders/services/ListOrdersService';
import { classToClass } from 'class-transformer';

export default class OrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { client_id, seller_id } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      client_id,
      seller_id,
    });

    return res.json(classToClass(order));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersService);

    const orders = await listOrders.execute();

    return res.json(classToClass(orders));
  }
}
