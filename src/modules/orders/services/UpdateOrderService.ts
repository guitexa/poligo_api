import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import IUpdateOrderDTO from '../dtos/IUpdateOrderDTO';

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  // Função para atualizar uma order específica
  public async execute({
    order_id,
    status_order,
    approved_at,
    delivery_conditions,
    technical_obs,
    requested_delivery_date,
    delivery_date,
    status_delivery,
    payment_way,
    due_date,
    status_billing,
    status_payment,
    technical_id,
  }: IUpdateOrderDTO): Promise<Order | undefined> {
    const order = await this.ordersRepository.findByIdWithoutRelations(
      order_id,
    );

    if (!order) {
      throw new AppError('This order_id was not found');
    }

    let technical: User | undefined;

    if (status_order) {
      order.status_order = status_order;
    }

    if (approved_at) {
      order.approved_at = approved_at;
    }

    if (delivery_conditions || delivery_conditions === '') {
      order.delivery_conditions = delivery_conditions;
    }

    if (technical_obs || technical_obs === '') {
      order.technical_obs = technical_obs;
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
