import Order from '../infra/typeorm/entities/Order';

export default interface ICreateOrderProductDTO {
  order: Order;
  product_id: string;
  product_description: string;
  product_value: number;
}
