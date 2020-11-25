import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  // Função para criar um client e retornar o client criado
  public async execute({
    name,
    cpf_cnpj,
    contact_name,
    email,
    mobile,
    phone,
  }: ICreateClientDTO): Promise<Client> {
    if (!name) {
      throw new AppError('You must provide a client name', 401);
    }

    if (!cpf_cnpj) {
      throw new AppError('You must provide a CPF or a CNPJ', 401);
    }

    if (!email) {
      throw new AppError('You must provide an email address', 401);
    }

    if (!contact_name) {
      throw new AppError('You must provide a contact name', 401);
    }

    if (!mobile && !phone) {
      throw new AppError('You must provide a phone', 401);
    }

    return this.clientsRepository.create({
      name,
      cpf_cnpj,
      contact_name,
      email,
      phone,
      mobile,
    });
  }
}
