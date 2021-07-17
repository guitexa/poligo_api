import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';

@injectable()
export default class DeleteOrderProductService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  // Função para deletar um order_product específico
  public async execute(order_product_id: string): Promise<void> {
    const order_product =
      await this.ordersProductsRepository.findOrderProductById(
        order_product_id,
      );

    if (!order_product) {
      throw new AppError('This order_product id was not found', 404);
    }

    // Deleta no banco de dados o order_product
    await this.ordersProductsRepository.delete(order_product_id);

    // Procura a order relacionada com esse order_product
    const order = await this.ordersRepository.findByIdWithoutRelations(
      order_product.order_id,
    );

    if (order) {
      // Procura todos os orders_products relacionados com esta order
      const orders_products =
        await this.ordersProductsRepository.findAllOrdersProductsByOrderId(
          order_product.order_id,
        );

      // Faz a soma de todos os orders_products relacionados com esta order
      if (orders_products) {
        const totalValue = orders_products
          .map(e => Number(e.product_value))
          .reduce((accumulator, serviceValue) => {
            return accumulator + serviceValue;
          }, 0);

        order.total_value = String(totalValue).replace(/[/.]/gi, ',');

        // Atualiza o total_value da order com a soma de todos os orders_products
        await this.ordersRepository.save(order);
      }
    }
  }
}
