import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrdersService from '@modules/orders/services/ListOrdersService';

export default class OrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      client_id,
      seller_id,
      total_value,
      status_order,
      approved_at,
      delivery_conditions,
      requested_delivery_date,
      delivery_date,
      status_delivery,
      payment_way,
      due_date,
      status_billing,
      status_payment,
      product_id,
      product_description,
      product_value,
      technical_id,
    } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      client_id,
      seller_id,
      total_value,
      status_order,
      approved_at,
      delivery_conditions,
      requested_delivery_date,
      delivery_date,
      status_delivery,
      payment_way,
      due_date,
      status_billing,
      status_payment,
      product_id,
      product_description,
      product_value,
      technical_id,
    });

    return res.json(order);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersService);

    const orders = await listOrders.execute();

    return res.json(orders);
  }
}
