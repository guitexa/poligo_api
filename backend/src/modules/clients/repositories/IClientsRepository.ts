import ICreateClientDTO from '../dtos/ICreateClientDTO';
import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  create(clientData: ICreateClientDTO): Promise<Client>;
  findAll(): Promise<Client[] | undefined>;
  findById(client_id: string): Promise<Client | undefined>;
}
