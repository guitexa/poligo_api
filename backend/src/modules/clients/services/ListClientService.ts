import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
export default class ListClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(client_id: string): Promise<Client | undefined> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    return client;
  }
}
