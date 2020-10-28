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
    company_name,
    cpf_cnpj,
    contact_name,
    email,
    phone,
    mobile,
  }: ICreateClientDTO): Promise<Client> {
    const client = await this.clientsRepository.create({
      company_name,
      cpf_cnpj,
      contact_name,
      email,
      phone,
      mobile,
    });

    return client;
  }
}
