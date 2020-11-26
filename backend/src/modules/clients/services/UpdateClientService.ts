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
    id: client_id,
    name,
    cnpj_cpf,
    contact_name,
    email,
    phone,
    mobile,
  }: IUpdateClientDTO): Promise<Client> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('This client_id was not found', 404);
    }

    if (name && name !== client.name) {
      const checkIfClientNameExists = await this.clientsRepository.findByName(
        name,
      );

      if (checkIfClientNameExists) {
        throw new AppError('This client name already exists', 401);
      }

      client.name = name;
    }

    if (cnpj_cpf || cnpj_cpf === '') {
      if (!cnpj_cpf) {
        throw new AppError('A CNPJ or CPF must be provided', 401);
      }
      client.cnpj_cpf = cnpj_cpf;
    }

    if (contact_name || contact_name === '') {
      if (!contact_name) {
        throw new AppError('A contact name must be provided', 401);
      }
      client.contact_name = contact_name;
    }

    if (email || email === '') {
      if (!email) {
        throw new AppError('An email must be provided', 401);
      }
      client.email = email;
    }

    if (phone || phone === '') {
      if (phone === '' && !client.mobile) {
        throw new AppError(
          'At least a phone or a mobile must be provided',
          401,
        );
      }

      client.phone = phone;
    }

    if (mobile || mobile === '') {
      if (mobile === '' && !client.phone) {
        throw new AppError(
          'At least a phone or a mobile must be provided',
          401,
        );
      }

      client.mobile = mobile;
    }

    return this.clientsRepository.save(client);
  }
}
