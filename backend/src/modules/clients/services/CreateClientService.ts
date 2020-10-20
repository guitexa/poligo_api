import { inject, injectable } from 'tsyringe';

import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  name: string;
  cpf_cnpj: string;
  phone?: string;
  contacts_id?: string;
}

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
    contacts_id,
  }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.create({
      name,
      cpf_cnpj,
      phone,
      contacts_id,
    });

    return client;
  }
}
