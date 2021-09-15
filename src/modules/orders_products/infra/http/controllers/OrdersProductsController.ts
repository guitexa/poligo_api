import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderProductService from '@modules/orders_products/services/CreateOrderProductService';
import ListOrderProductService from '@modules/orders_products/services/ListOrderProductService';
import UpdateOrderProductService from '@modules/orders_products/services/UpdateOrderProductService';
import DeleteOrderProductService from '@modules/orders_products/services/DeleteOrderProductService';

export default class OrdersProductsController {
  // Função para criar um order_product
  public async create(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    const {
      product_id,
      product_value,
      product_description,
      product_payment_type,
    } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createOrderProduct = container.resolve(CreateOrderProductService);

    // Executa o service enviando os valores recebidos no params e no body
    const order_product = await createOrderProduct.execute({
      order_id,
      product_id,
      product_value,
      product_description,
      product_payment_type,
    });

    // Responde a requisição com o retorno do service
    return res.json(order_product);
  }

  // Função para mostrar um order_product específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { order_product_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listOrderProduct = container.resolve(ListOrderProductService);

    // Executa o service enviando os valores recebidos no params
    const order_product = await listOrderProduct.execute(order_product_id);

    // Responde a requisição com o retorno do service
    return res.json(order_product);
  }

  // Função para atualizar um order_product específico
  public async update(req: Request, res: Response): Promise<Response> {
    const { order_product_id } = req.params;

    const {
      product_id,
      product_description,
      product_value,
      product_payment_type,
    } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const updateOrderProduct = container.resolve(UpdateOrderProductService);

    // Executa o service enviando os valores recebidos no params e no body
    const order_product = await updateOrderProduct.execute({
      order_product_id,
      product_id,
      product_description,
      product_value,
      product_payment_type,
    });

    // Responde a requisição com o retorno do service
    return res.json(order_product);
  }

  // Função para deletar um order_product específico
  public async delete(req: Request, res: Response): Promise<Response> {
    const { order_product_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const deleteOrderProduct = container.resolve(DeleteOrderProductService);

    // Executa o service enviando os valores recebidos no params e no body
    await deleteOrderProduct.execute(order_product_id);

    // Responde a requisição com status OK
    return res.status(204).send();
  }
}
