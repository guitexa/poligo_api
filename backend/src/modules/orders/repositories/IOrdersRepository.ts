import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrdersRepository {
  create(orderData: ICreateOrderDTO): Promise<Order>;
  findAll(): Promise<Order[] | undefined>;
}
