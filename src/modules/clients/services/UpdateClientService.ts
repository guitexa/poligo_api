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

    // Verifica se há um nome e se é diferente do atual
    if ((name && name !== client.name) || name === '') {
      // Verifica se o usuário não está tentando limpar o campo
      if (!name) {
        throw new AppError('A name must be provided', 401);
      }
      const checkIfClientNameExists = await this.clientsRepository.findByName(
        name,
      );

      if (checkIfClientNameExists) {
        throw new AppError('This client name already exists', 401);
      }

      client.name = name;
    }

    if (cnpj_cpf || cnpj_cpf === '') {
      client.cnpj_cpf = cnpj_cpf;
    }

    if (contact_name || contact_name === '') {
      // Verifica se o usuário não está tentando limpar o campo
      if (!contact_name) {
        throw new AppError('A contact name must be provided', 401);
      }
      client.contact_name = contact_name;
    }

    if (email || email === '') {
      // Verifica se o usuário não está tentando limpar o campo
      if (!email) {
        throw new AppError('An email must be provided', 401);
      }
      client.email = email;
    }

    if (phone || phone === '') {
      // Verifica se o usuário não está tentando limpar o campo sem que haja outro telefone
      if (phone === '' && !client.mobile) {
        throw new AppError(
          'At least a phone or a mobile must be provided',
          401,
        );
      }

      client.phone = phone;
    }

    if (mobile || mobile === '') {
      // Verifica se o usuário não está tentando limpar o campo sem que haja outro telefone
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
