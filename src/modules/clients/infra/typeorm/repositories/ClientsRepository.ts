import { Repository, getRepository } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import Client from '@modules/clients/infra/typeorm/entities/Client';

export default class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  // Função para criar um client
  public async create(client: ICreateClientDTO): Promise<Client> {
    const newClient = this.ormRepository.create(client);

    await this.ormRepository.save(newClient);

    return newClient;
  }

  // Função para procurar todos os clients cadastrados
  public async findAll(): Promise<Client[] | undefined> {
    return this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  // Função para procurar um client específico pelo ID
  public async findById(client_id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: {
        id: client_id,
      },
    });

    return client;
  }

  // Função para procurar um client específico pelo nome
  public async findByName(client_name: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: {
        name: client_name,
      },
    });

    return client;
  }

  // Função para atualizar um client específico
  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }
}
