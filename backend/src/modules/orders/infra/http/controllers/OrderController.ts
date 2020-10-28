import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrderService from '@modules/orders/services/ListOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import { classToClass } from 'class-transformer';

export default class OrderController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    const listOrder = container.resolve(ListOrderService);

    const order = await listOrder.execute(order_id);

    return res.json(classToClass(order));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    const {
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
      technical_id,
      product_id,
      product_description,
      product_value,
    } = req.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      order_id,
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
      technical_id,
      product_id,
      product_description,
      product_value,
    });

    return res.json(classToClass(order));
  }
}
