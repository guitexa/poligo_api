import { inject, injectable } from 'tsyringe';

import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    cpf_cnpj,
    phone,
    email,
    contacts_id,
  }: ICreateClientDTO): Promise<Client> {
    const client = await this.clientsRepository.create({
      name,
      cpf_cnpj,
      phone,
      email,
      contacts_id,
    });

    return client;
  }
}
