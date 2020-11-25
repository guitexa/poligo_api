import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';

@injectable()
export default class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  // Função para atualizar um client existente e retornar o client atualizado
  public async execute({
    id,
    name,
    cpf_cnpj,
    contact_name,
    email,
    phone,
    mobile,
  }: IUpdateClientDTO): Promise<Client> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('This client_id was not found', 404);
    }

    if (name || name === '') {
      const checkIfClientNameExists = await this.clientsRepository.findByName(
        name,
      );

      if (checkIfClientNameExists) {
        throw new AppError('This client name already exists', 401);
      }

      client.name = name;
    }

    if (cpf_cnpj || cpf_cnpj === '') {
      client.cpf_cnpj = cpf_cnpj;
    }

    if (contact_name || contact_name === '') {
      client.contact_name = contact_name;
    }

    if (email || email === '') {
      client.email = email;
    }

    if (phone || phone === '') {
      client.phone = phone;
    }

    if (mobile || mobile === '') {
      client.mobile = mobile;
    }

    return this.clientsRepository.save(client);
  }
}
