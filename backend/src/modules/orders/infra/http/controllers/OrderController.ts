import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrderService from '@modules/orders/services/ListOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import { classToClass } from 'class-transformer';

export default class OrderController {
  // Função para mostrar uma order específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listOrder = container.resolve(ListOrderService);

    // Executa o service enviando os valores recebidos no params
    const order = await listOrder.execute(order_id);

    // Responde a requisição com o retorno do service
    return res.json(classToClass(order));
  }

  // Função para atualizar uma order específico
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

    // Realiza injeção de dependência para utilizar o service
    const updateOrder = container.resolve(UpdateOrderService);

    // Executa o service enviando os valores recebidos no params e no body
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

    // Responde a requisição com o retorno do service
    return res.json(classToClass(order));
  }
}
