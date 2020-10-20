import { Repository, getRepository } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import Client from '@modules/clients/infra/typeorm/entities/Client';

export default class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(clientData);

    await this.ormRepository.save(client);

    return client;
  }

  public async findAll(): Promise<Client[] | undefined> {
    return this.ormRepository.find();
  }
}
