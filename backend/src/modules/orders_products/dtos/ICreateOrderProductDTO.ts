// Interface para tipar as variáveis ao criar um order_product

import Order from '@modules/orders/infra/typeorm/entities/Order';

export default interface ICreateOrderProductDTO {
  order: Order;
  product_id: string;
  product_description?: string;
  product_value: number;
}
