import Order from '../infra/typeorm/entities/Order';

export default interface ICreateOrdersProductsDTO {
  order: Order;
  product_id: string;
  product_description: string;
  product_value: number;
}
