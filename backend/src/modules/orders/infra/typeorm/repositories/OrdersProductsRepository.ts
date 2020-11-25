import { Repository, getRepository } from 'typeorm';

import IOrdersProductsRepository from '@modules/orders/repositories/IOrdersProductsRepository';
import ICreateOrderProductDTO from '@modules/orders/dtos/ICreateOrderProductDTO';
import OrderProduct from '../entities/OrderProduct';

export default class OrdersProductsRepository
  implements IOrdersProductsRepository {
  private ormRepository: Repository<OrderProduct>;

  constructor() {
    this.ormRepository = getRepository(OrderProduct);
  }

  // Função para criar um order_product
  public async create(
    order_product: ICreateOrderProductDTO,
  ): Promise<OrderProduct> {
    const newOrderProduct = this.ormRepository.create(order_product);

    await this.ormRepository.save(newOrderProduct);

    return newOrderProduct;
  }

  // Função para procurar todos os orders_products de um order específico
  public async findOrdersProductsByOrderId(
    order_id: string,
  ): Promise<OrderProduct[] | undefined> {
    return this.ormRepository.find({
      where: {
        order_id,
      },
    });
  }

  // Função para procurar um order_product específico
  public async findOrderProductById(
    order_product_id: string,
  ): Promise<OrderProduct | undefined> {
    return this.ormRepository.findOne({
      where: {
        id: order_product_id,
      },
    });
  }

  // Função para atualizar um order_product específico
  public async save(order_product: OrderProduct): Promise<OrderProduct> {
    await this.ormRepository.save(order_product);

    const findOrderProduct = await this.ormRepository.findOne({
      where: {
        id: order_product.id,
      },
      relations: ['product'],
    });

    if (findOrderProduct) {
      return findOrderProduct;
    }
    return this.ormRepository.save(order_product);
  }

  // Função para deletar um order_product específico
  public async delete(order_product_id: string): Promise<void> {
    const order_product = await this.ormRepository.findOne({
      where: {
        id: order_product_id,
      },
    });

    if (order_product) {
      await this.ormRepository.remove(order_product);
    }
  }
}
