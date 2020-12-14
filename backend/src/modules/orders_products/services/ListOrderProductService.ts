import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';

@injectable()
export default class ListOrderProductService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {}

  // Função para procurar um order_product específico
  public async execute(order_product_id: string): Promise<OrderProduct> {
    const order_product = await this.ordersProductsRepository.findOrderProductById(
      order_product_id,
    );

    if (!order_product) {
      throw new AppError('This order_product_id was not found', 404);
    }

    return order_product;
  }
}
