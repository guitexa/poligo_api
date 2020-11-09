import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrderProductService from '@modules/orders/services/ListOrderProductService';
import UpdateOrderProductService from '@modules/orders/services/UpdateOrderProductService';
import DeleteOrderProductService from '@modules/orders/services/DeleteOrderProductService';

export default class OrderProductController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { order_product_id } = req.params;

    const listOrderProduct = container.resolve(ListOrderProductService);

    const order_product = await listOrderProduct.execute(order_product_id);

    return res.json(order_product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { order_product_id } = req.params;

    const { product_id, product_description, product_value } = req.body;

    const updateOrderProduct = container.resolve(UpdateOrderProductService);

    const order_product = await updateOrderProduct.execute({
      order_product_id,
      product_id,
      product_description,
      product_value,
    });

    return res.json(order_product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { order_product_id } = req.params;

    const deleteOrderProduct = container.resolve(DeleteOrderProductService);

    await deleteOrderProduct.execute(order_product_id);

    return res.status(204).send();
  }
}
