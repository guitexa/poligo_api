import ICreateOrderProductDTO from '../dtos/ICreateOrderProductDTO';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';

export default interface IOrdersProductsRepository {
  create(orderData: ICreateOrderProductDTO): Promise<OrderProduct>;
  findOrderProductsByOrderId(
    order_id: string,
  ): Promise<OrderProduct[] | undefined>;
  findOrderProductByOrderId(
    order_product_id: string,
  ): Promise<OrderProduct | undefined>;
  save(order_product: OrderProduct): Promise<OrderProduct>;
  delete(order_product_id: string): Promise<void>;
}
