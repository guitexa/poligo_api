import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductService from '@modules/products/services/ListProductService';

export default class ProductController {
  // Função para mostrar um product específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listProduct = container.resolve(ListProductService);

    // Executa o service enviando os valores recebidos no params
    const products = await listProduct.execute(product_id);

    // Responde a requisição com o retorno do service
    return res.json(products);
  }
}
