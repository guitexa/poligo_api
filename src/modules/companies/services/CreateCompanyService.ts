import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  // Função para criar uma company e retornar o company criado
  public async execute({
    name,
    cnpj_cpf,
    contact_name,
    email,
    mobile,
    phone,
  }: ICreateCompanyDTO): Promise<Company> {
    if (!name) {
      throw new AppError('A company name must be provided', 401);
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

    return this.companiesRepository.create({
      name,
      cnpj_cpf,
      contact_name,
      email,
      phone,
      mobile,
    });
  }
}
