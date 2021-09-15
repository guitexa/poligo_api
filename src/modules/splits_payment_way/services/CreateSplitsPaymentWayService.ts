import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IPaymentMethodsRepository from '@modules/payment_methods/repositories/IPaymentMethodsRepository';
import { addMonths, endOfDay, isBefore, parseISO } from 'date-fns';
import SplitPaymentWay from '../infra/typeorm/entities/SplitPaymentWay';
import ISplitsPaymentWayRepository from '../repositories/ISplitsPaymentWayRepository';
import ICreateSplitPaymentWayDTO from '../dtos/ICreateSplitPaymentWayDTO';

interface IRequest {
  order_id: string;
  payment_way: string;
  order_total_value: number;
  enter_due_date?: Date | null;
  enter_value?: number;
  enter_payment_method_id?: string;
  splits_quantity: number;
  split_due_date: Date | null;
  split_value: number;
  split_payment_method_id: string;
}

@injectable()
export default class CreateSplitsPaymentWayService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,

    @inject('SplitsPaymentWayRepository')
    private splitsPaymentWayRepository: ISplitsPaymentWayRepository,
  ) {}

  // Função para criar um parcelamento
  public async execute({
    order_id,
    payment_way,
    order_total_value,
    enter_due_date,
    enter_value,
    enter_payment_method_id,
    splits_quantity,
    split_due_date,
    split_value,
    split_payment_method_id,
  }: IRequest): Promise<SplitPaymentWay[]> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('This order was not found', 404);
    }

    if (order.splits_payment_way.length) {
      throw new AppError('This order already has splits');
    }

    // Verificações da entrada
    if (enter_payment_method_id) {
      const enter_payment_method = await this.paymentMethodsRepository.findById(
        enter_payment_method_id,
      );

      if (!enter_payment_method) {
        throw new AppError('This enter payment method was not found', 404);
      }
    }

    if (enter_due_date) {
      if (
        enter_due_date !== null &&
        isBefore(endOfDay(parseISO(String(enter_due_date))), Date.now())
      ) {
        throw new AppError('You cannot set a past enter due date');
      }

      if (enter_due_date === null) {
        throw new AppError('You cannot set null to enter due date');
      }
    }

    if (enter_value && enter_value <= 0) {
      throw new AppError('Enter value must have a positive value');
    }

    // Verificações do parcelamento
    const split_payment_method = await this.paymentMethodsRepository.findById(
      split_payment_method_id,
    );

    if (!split_payment_method) {
      throw new AppError('This split payment method was not found', 404);
    }

    if (
      split_due_date !== null &&
      isBefore(endOfDay(parseISO(String(split_due_date))), Date.now())
    ) {
      throw new AppError('You cannot set a past split due date');
    }

    if (split_due_date === null) {
      throw new AppError('You cannot set null to split due date');
    }

    if (split_value <= 0) {
      throw new AppError('Split value must have a positive value');
    }

    if (splits_quantity < 2) {
      throw new AppError('Split value must have a positive value');
    }

    const splitsPaymentWay: ICreateSplitPaymentWayDTO[] = [];

    // Cria um SplitPaymentWay para cada parcela
    for (let i = 0; i <= splits_quantity; i += 1) {
      if (
        i === 0 &&
        payment_way === 'Com entrada' &&
        enter_value &&
        enter_due_date &&
        enter_payment_method_id
      ) {
        // Cria a entrada
        splitsPaymentWay.push({
          order,
          payment_way,
          split_number: i,
          split_value: enter_value,
          split_due_date: enter_due_date,
          payment_method_id: enter_payment_method_id,
        });
      } else if (i > 0 && i < splits_quantity) {
        // Cria as parcelas
        splitsPaymentWay.push({
          order,
          payment_way,
          split_number: i,
          split_value,
          split_due_date: addMonths(parseISO(String(split_due_date)), i - 1),
          payment_method_id: split_payment_method_id,
        });
      } else if (i === Number(splits_quantity)) {
        // Calcula a diferença das parcelas com o valor total
        const totalValueDiff =
          order_total_value -
          (enter_value || 0) -
          splits_quantity * split_value;

        // Cria a última parcela com a diferença, se houver
        splitsPaymentWay.push({
          order,
          payment_way,
          split_number: i,
          split_value: Number((split_value + totalValueDiff).toFixed(2)),
          split_due_date: addMonths(parseISO(String(split_due_date)), i - 1),
          payment_method_id: split_payment_method_id,
        });
      }
    }

    // Altera o valor do payment_way para Parcelado
    order.payment_way = 'Parcelado';

    // Atualiza o payment_way da order
    await this.ordersRepository.save(order);

    const formattedSplitsPaymentWay = [];

    // Coloca todas as promises num array para serem executadas
    for (let i = 0; i < splitsPaymentWay.length; i += 1) {
      formattedSplitsPaymentWay.push(
        this.splitsPaymentWayRepository.create(splitsPaymentWay[i]),
      );
    }

    return Promise.all(formattedSplitsPaymentWay);
  }
}
