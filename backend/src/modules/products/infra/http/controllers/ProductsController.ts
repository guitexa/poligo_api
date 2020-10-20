import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';

export default class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
    });

    return res.json(product);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return res.json(products);
  }
}
