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
    cnpj_cpf,
    contact_name,
    email,
    mobile,
    phone,
  }: ICreateClientDTO): Promise<Client> {
    if (!name) {
      throw new AppError('A client name must be provided', 401);
    }

    if (!contact_name) {
      throw new AppError('A contact name must be provided', 401);
    }

    if (!email) {
      throw new AppError('An email address must be provided', 401);
    }

    if (!mobile && !phone) {
      throw new AppError('A phone must be provided', 401);
    }

    return this.clientsRepository.create({
      name,
      cnpj_cpf,
      contact_name,
      email,
      phone,
      mobile,
    });
  }
}
