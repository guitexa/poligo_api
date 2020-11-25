import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';
import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  create(client: ICreateClientDTO): Promise<Client>;
  findAll(): Promise<Client[] | undefined>;
  findById(client_id: string): Promise<Client | undefined>;
  findByName(client_name: string): Promise<Client | undefined>;
  save(client: IUpdateClientDTO): Promise<Client>;
}
