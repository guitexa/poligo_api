import ICreateOrdersProductsDTO from '../dtos/ICreateOrdersProductsDTO';
import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';

export default interface IOrdersProductsRepository {
  create(orderData: ICreateOrdersProductsDTO): Promise<OrdersProducts>;
  findOrderProductsByOrderId(
    order_id: string,
  ): Promise<OrdersProducts[] | undefined>;
}
