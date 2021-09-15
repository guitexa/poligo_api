import { inject, injectable } from 'tsyringe';
import { endOfDay, isBefore } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import PaymentMethod from '@modules/payment_methods/infra/typeorm/entities/PaymentMethod';
import IPaymentMethodsRepository from '@modules/payment_methods/repositories/IPaymentMethodsRepository';
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

    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
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
    payment_method_id,
    status_billing,
    status_payment,
    technical_id,
    total_value,
  }: IUpdateOrderDTO): Promise<Order | undefined> {
    const order = await this.ordersRepository.findByIdWithoutRelations(
      order_id,
    );

    if (!order) {
      throw new AppError('This order id was not found');
    }

    let technical: User | undefined;

    let payment_method: PaymentMethod | undefined;

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

    if (due_date || due_date === null) {
      if (
        due_date !== null &&
        isBefore(endOfDay(due_date), Date.now()) &&
        status_order === 'Aprovado'
      ) {
        throw new AppError('You cannot set a past due date');
      }
      order.due_date = due_date;
    }

    if (payment_method_id) {
      payment_method = await this.paymentMethodsRepository.findById(
        payment_method_id,
      );

      if (!payment_method) {
        throw new AppError('This payment_method id was not found', 404);
      }

      order.payment_method_id = payment_method_id;
    }

    if (payment_method_id === null) {
      order.payment_method_id = payment_method_id;
    }

    if (total_value || total_value === '') {
      order.total_value = total_value;
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
        throw new AppError('This technical id was not found', 404);
      }

      order.technical_id = technical_id;
    }

    if (technical_id === null) {
      order.technical_id = technical_id;
    }

    return this.ordersRepository.save(order);
  }
}
