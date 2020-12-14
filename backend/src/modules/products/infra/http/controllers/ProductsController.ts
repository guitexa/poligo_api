import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';

export default class ProductsController {
  // Função para criar um novo produto
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createProduct = container.resolve(CreateProductService);

    // Executa o service enviando os valores recebidos no params
    const product = await createProduct.execute({
      name,
    });

    // Responde a requisição com o retorno do service
    return res.json(product);
  }

  // Função para mostrar os produtos cadastrados
  public async show(req: Request, res: Response): Promise<Response> {
    // Realiza injeção de dependência para utilizar o service
    const listProducts = container.resolve(ListProductsService);

    // Executa o service
    const products = await listProducts.execute();

    // Responde a requisição com o retorno do service
    return res.json(products);
  }
}
