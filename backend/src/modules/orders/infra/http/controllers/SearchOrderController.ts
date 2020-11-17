import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchOrderService from '@modules/orders/services/SearchOrderService';
import { classToClass } from 'class-transformer';

export default class SearchOrderController {
  public async show(req: Request, res: Response): Promise<Response> {
    const searchData = req.query;

    const searchOrder = container.resolve(SearchOrderService);

    const orders = await searchOrder.execute(searchData);

    return res.json(classToClass(orders));
  }
}
