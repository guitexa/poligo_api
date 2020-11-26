import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';

interface IRequest {
  order_id: string;
  product_id: string;
  product_description: string;
  product_value: number;
}

@injectable()
export default class CreateOrderProductService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Função para criar um order_product
  public async execute({
    order_id,
    product_id,
    product_description,
    product_value,
  }: IRequest): Promise<OrderProduct | undefined> {
    const order = await this.ordersRepository.findByIdWithoutRelations(
      order_id,
    );

    if (!order) {
      throw new AppError('This order was not found', 404);
    }

    if (product_id) {
      const product = await this.productsRepository.findById(product_id);

      if (!product) {
        throw new AppError('This product_id was not found', 404);
      }
    }

    if (!product_value || product_value <= 0) {
      throw new AppError('A product_value must be provided', 401);
    }

    // Ao criar um order_product pegamos o order_product_id para enviar esse order_product no response
    const { id: order_product_id } = await this.ordersProductsRepository.create(
      {
        order,
        product_id,
        product_description,
        product_value,
      },
    );

    // Procura todos os orders_products relacionados com esta order
    const orders_products = await this.ordersProductsRepository.findAllOrdersProductsByOrderId(
      order_id,
    );

    if (orders_products) {
      // Faz a soma de todos os orders_products relacionados com esta order
      const totalValue = orders_products
        .map(e => Number(e.product_value))
        .reduce((accumulator, serviceValue) => {
          return accumulator + serviceValue;
        }, 0);

      order.total_value = String(totalValue).replace(/[/.]/gi, ',');

      // Faz a concatenação de todos os nomes de products cadastrados
      const products = String(orders_products.map(e => e.product.name));

      order.products = products;

      // Atualiza o total_value da order com a soma de todos os orders_products
      await this.ordersRepository.save(order);
    }

    return this.ordersProductsRepository.findOrderProductById(order_product_id);
  }
}
