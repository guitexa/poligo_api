import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductService from '@modules/products/services/ListProductService';

export default class ProductController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;

    const listProduct = container.resolve(ListProductService);

    const products = await listProduct.execute(product_id);

    return res.json(products);
  }
}
