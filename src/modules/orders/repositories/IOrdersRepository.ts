import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import Order from '../infra/typeorm/entities/Order';
import ISearchOrderDTO from '../dtos/ISearchOrderDTO';
import IFindAllOrdersDTO from '../dtos/IFindAllOrdersDTO';

export default interface IOrdersRepository {
  create(order: ICreateOrderDTO): Promise<Order>;
  findAll(data: IFindAllOrdersDTO): Promise<Order[] | undefined>;
  findAllWithErrors(data: IFindAllOrdersDTO): Promise<Order[] | undefined>;
  findById(order_id: string): Promise<Order | undefined>;
  findByIdWithoutRelations(order_id: string): Promise<Order | undefined>;
  save(order: Order): Promise<Order>;
  search(search: ISearchOrderDTO): Promise<Order[] | undefined>;
}
