import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';
import IUpdateOrderDTO from '../dtos/IUpdateOrderDTO';

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  // Função para atualizar uma order específica e/ou criar um order_product
  public async execute({
    order_id,
    status_order,
    approved_at,
    delivery_conditions,
    requested_delivery_date,
    delivery_date,
    status_delivery,
    payment_way,
    due_date,
    status_billing,
    status_payment,
    technical_id,
    product_id,
    product_description,
    product_value,
  }: IUpdateOrderDTO): Promise<Order | undefined> {
    const order = await this.ordersRepository.findByIdWithoutRelations(
      order_id,
    );

    if (!order) {
      throw new AppError('This order_id was not found');
    }

    let technical: User | undefined;

    // Se houver product a order será atualizada e será criado um order_product
    if (product_id) {
      if (!product_value) {
        throw new AppError('You must provide a value');
      }

      const product = await this.productsRepository.findById(product_id);

      if (!product) {
        throw new AppError('This product_id was not found');
      }

      await this.ordersProductsRepository.create({
        order,
        product_id,
        product_description,
        product_value,
      });

      if (status_order || status_order === '') {
        order.status_order = status_order;
      }

      if (approved_at || approved_at === '') {
        order.approved_at = approved_at;
      }

      if (delivery_conditions || delivery_conditions === '') {
        order.delivery_conditions = delivery_conditions;
      }

      if (requested_delivery_date || requested_delivery_date === null) {
        order.requested_delivery_date = requested_delivery_date;
      }

      if (delivery_date || delivery_date === null) {
        order.delivery_date = delivery_date;
      }

      if (status_delivery || status_delivery === '') {
        order.status_delivery = status_delivery;
      }

      if (payment_way || payment_way === '') {
        order.payment_way = payment_way;
      }

      if (due_date || due_date === '') {
        order.due_date = due_date;
      }

      if (status_billing || status_billing === '') {
        order.status_billing = status_billing;
      }

      if (status_payment || status_payment === '') {
        order.status_payment = status_payment;
      }

      if (technical_id) {
        technical = await this.usersRepository.findById(technical_id);

        if (!technical) {
          throw new AppError('This technical_id was not found', 404);
        }

        order.technical_id = technical_id;
      }

      if (technical_id === null) {
        order.technical_id = technical_id;
      }

      const orders_products = await this.ordersProductsRepository.findOrdersProductsByOrderId(
        order_id,
      );

      // Procura todos os orders_products e faz a soma de todos os valores
      if (orders_products) {
        const totalValue = orders_products
          .map(e => Number(e.product_value))
          .reduce((accumulator, serviceValue) => {
            return accumulator + serviceValue;
          }, 0);

        order.total_value = String(totalValue).replace(/[/.]/gi, ',');
      }

      return this.ordersRepository.save(order);
    }

    // Se não houver product apenas a order será atualizada

    if (status_order || status_order === '') {
      order.status_order = status_order;
    }

    if (approved_at || approved_at === '') {
      order.approved_at = approved_at;
    }

    if (delivery_conditions || delivery_conditions === '') {
      order.delivery_conditions = delivery_conditions;
    }

    if (requested_delivery_date || requested_delivery_date === null) {
      order.requested_delivery_date = requested_delivery_date;
    }

    if (delivery_date || delivery_date === null) {
      order.delivery_date = delivery_date;
    }

    if (status_delivery || status_delivery === '') {
      order.status_delivery = status_delivery;
    }

    if (payment_way || payment_way === '') {
      order.payment_way = payment_way;
    }

    if (due_date || due_date === '') {
      order.due_date = due_date;
    }

    if (status_billing || status_billing === '') {
      order.status_billing = status_billing;
    }

    if (status_payment || status_payment === '') {
      order.status_payment = status_payment;
    }

    if (technical_id) {
      technical = await this.usersRepository.findById(technical_id);

      if (!technical) {
        throw new AppError('This technical_id was not found', 404);
      }

      order.technical_id = technical_id;
    }

    if (technical_id === null) {
      order.technical_id = technical_id;
    }

    return this.ordersRepository.save(order);
  }
}
