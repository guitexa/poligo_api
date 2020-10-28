import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import User from '@modules/users/infra/typeorm/entities/User';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';
import IUpdateOrderDTO from '../dtos/IUpdateOrderDTO';
import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';

interface IResponse {
  order: Order | undefined;
  client: Client | undefined;
  products: OrdersProducts[] | undefined;
  seller: User | undefined;
  technical: User | undefined;
}

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

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
  }: IUpdateOrderDTO): Promise<IResponse> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('This order does not exists');
    }

    let technical: User | undefined;

    if (product_id && product_description && product_value) {
      const product = await this.productsRepository.findById(product_id);

      if (!product) {
        throw new AppError('Could not find this product');
      }

      await this.ordersProductsRepository.create({
        order,
        product_id,
        product_description,
        product_value,
      });

      const client = await this.clientsRepository.findById(order.client_id);

      const products = await this.ordersProductsRepository.findOrderProductsByOrderId(
        order_id,
      );

      if (status_order) {
        order.status_order = status_order;
      }

      if (approved_at) {
        order.approved_at = approved_at;
      }

      if (delivery_conditions) {
        order.delivery_conditions = delivery_conditions;
      }

      if (requested_delivery_date) {
        order.requested_delivery_date = requested_delivery_date;
      }

      if (delivery_date) {
        order.delivery_date = delivery_date;
      }

      if (status_delivery) {
        order.status_delivery = status_delivery;
      }

      if (payment_way) {
        order.payment_way = payment_way;
      }

      if (due_date) {
        order.due_date = due_date;
      }

      if (status_billing) {
        order.status_billing = status_billing;
      }

      if (status_payment) {
        order.status_payment = status_payment;
      }

      if (technical_id) {
        technical = await this.usersRepository.findById(technical_id);

        if (!technical) {
          throw new AppError('This technical does not exists');
        }

        order.technical_id = technical_id;
      }

      const seller = await this.usersRepository.findById(order.seller_id);

      const orderUpdated = await this.ordersRepository.save(order);

      return {
        order: orderUpdated,
        client,
        seller,
        technical,
        products,
      };
    }
    const client = await this.clientsRepository.findById(order.client_id);

    const products = await this.ordersProductsRepository.findOrderProductsByOrderId(
      order_id,
    );

    if (status_order) {
      order.status_order = status_order;
    }

    if (approved_at) {
      order.approved_at = approved_at;
    }

    if (delivery_conditions) {
      order.delivery_conditions = delivery_conditions;
    }

    if (requested_delivery_date) {
      order.requested_delivery_date = requested_delivery_date;
    }

    if (delivery_date) {
      order.delivery_date = delivery_date;
    }

    if (status_delivery) {
      order.status_delivery = status_delivery;
    }

    if (payment_way) {
      order.payment_way = payment_way;
    }

    if (due_date) {
      order.due_date = due_date;
    }

    if (status_billing) {
      order.status_billing = status_billing;
    }

    if (status_payment) {
      order.status_payment = status_payment;
    }

    if (technical_id) {
      technical = await this.usersRepository.findById(technical_id);

      if (!technical) {
        throw new AppError('This technical does not exists');
      }

      order.technical_id = technical_id;
    }

    const seller = await this.usersRepository.findById(order.seller_id);

    const orderUpdated = await this.ordersRepository.save(order);

    return {
      order: orderUpdated,
      client,
      products,
      seller,
      technical,
    };
  }
}
