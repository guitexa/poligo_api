import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';

@injectable()
export default class DeleteOrderProductService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {}

  public async execute(order_product_id: string): Promise<void> {
    const order_product = await this.ordersProductsRepository.findOrderProductByOrderId(
      order_product_id,
    );

    if (!order_product) {
      throw new AppError('This order_product was not found', 404);
    }

    return this.ordersProductsRepository.delete(order_product_id);
  }
}
