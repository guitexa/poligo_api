import { inject, injectable } from 'tsyringe';

import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
export default class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<Client[] | undefined> {
    return this.clientsRepository.findAll();
  }
}
