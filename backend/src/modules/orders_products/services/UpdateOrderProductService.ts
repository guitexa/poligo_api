import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';
import IUpdateOrderProductDTO from '../dtos/IUpdateOrderProductDTO';

@injectable()
export default class UpdateOrderProductService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Função para atualizar um order_product específico
  public async execute({
    order_product_id,
    product_id,
    product_description,
    product_value,
  }: IUpdateOrderProductDTO): Promise<OrderProduct> {
    const order_product = await this.ordersProductsRepository.findOrderProductById(
      order_product_id,
    );

    if (!order_product) {
      throw new AppError('This order_product_id was not found', 404);
    }

    if (product_id) {
      const product = await this.productsRepository.findById(product_id);

      if (!product) {
        throw new AppError('This product_id was not found', 404);
      }

      order_product.product.id = product_id;
    }

    if (product_description || product_description === '') {
      order_product.product_description = product_description;
    }

    if (product_value) {
      order_product.product_value = product_value;
    }

    // Atualiza o order_product
    await this.ordersProductsRepository.save(order_product);

    // Procura a order relacionada com esse order_product
    const order = await this.ordersRepository.findByIdWithoutRelations(
      order_product.order.id,
    );

    if (order) {
      // Procura todos os orders_products relacionados com esta order
      const orders_products = await this.ordersProductsRepository.findAllOrdersProductsByOrderId(
        order_product.order.id,
      );

      // Faz a soma de todos os orders_products relacionados com esta order
      if (orders_products) {
        const totalValue = orders_products
          .map(e => Number(e.product_value))
          .reduce((accumulator, serviceValue) => {
            return accumulator + serviceValue;
          }, 0);

        order.total_value = String(totalValue).replace(/[/.]/gi, ',');

        const products = orders_products.map(e => e.product.name);

        order.products = String(products);

        // Atualiza o total_value da order com a soma de todos os orders_products
        await this.ordersRepository.save(order);
      }
    }

    return order_product;
  }
}
