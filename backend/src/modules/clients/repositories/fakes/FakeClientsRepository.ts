import { uuid } from 'uuidv4';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import Client from '../../infra/typeorm/entities/Client';

export default class FakeClientsRepository implements IClientsRepository {
  private clientRepository: Client[] = [];

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, { id: uuid() }, clientData);

    this.clientRepository.push(client);

    return client;
  }

  public async findAll(): Promise<Client[] | undefined> {
    return this.clientRepository;
  }
}
