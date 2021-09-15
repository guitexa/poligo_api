// Interface para tipar as variáveis ao criar uma parcela

import Order from '@modules/orders/infra/typeorm/entities/Order';

export default interface ICreateSplitPaymentWayDTO {
  order: Order;
  payment_way: string;
  split_number: number;
  split_value: number;
  split_due_date: Date | null;
  payment_method_id: string;
}
