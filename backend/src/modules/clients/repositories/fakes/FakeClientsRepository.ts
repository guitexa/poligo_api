import { v4 } from 'uuid';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import Client from '../../infra/typeorm/entities/Client';

export default class FakeClientsRepository implements IClientsRepository {
  private clientRepository: Client[] = [];

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, { id: v4() }, clientData);

    this.clientRepository.push(client);

    return client;
  }

  public async findAll(): Promise<Client[] | undefined> {
    return this.clientRepository;
  }

  public async findById(client_id: string): Promise<Client | undefined> {
    return this.clientRepository.find(client => client.id === client_id);
  }

  public async findByName(client_name: string): Promise<Client | undefined> {
    return this.clientRepository.find(client => client.name === client_name);
  }

  public async save(client: Client): Promise<Client> {
    return client;
  }
}
