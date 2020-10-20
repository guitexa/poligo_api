import { inject, injectable } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    client_id,
    seller_id,
    total_value,
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
    product_id,
    product_description,
    product_value,
    technical_id,
  }: ICreateOrderDTO): Promise<Order> {
    const order = await this.ordersRepository.create({
      client_id,
      seller_id,
      total_value,
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
      product_id,
      product_description,
      product_value,
      technical_id,
    });

    return order;
  }
}
