import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import IUpdateCompanyDTO from '../dtos/IUpdateCompanyDTO';

@injectable()
export default class UpdateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  // Função para atualizar uma company existente e retornar a company atualizado
  public async execute({
    id: company_id,
    name,
    cnpj_cpf,
    contact_name,
    email,
    phone,
    mobile,
  }: IUpdateCompanyDTO): Promise<Company> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('This company id was not found', 404);
    }

    // Verifica se há um nome e se é diferente do atual
    if ((name && name !== company.name) || name === '') {
      // Verifica se o usuário não está tentando limpar o campo
      if (!name) {
        throw new AppError('A name must be provided', 401);
      }
      const checkIfCompanyNameExists =
        await this.companiesRepository.findByName(name);

      if (checkIfCompanyNameExists) {
        throw new AppError('This company name already exists', 401);
      }

      company.name = name;
    }

    if (cnpj_cpf || cnpj_cpf === '') {
      company.cnpj_cpf = cnpj_cpf;
    }

    if (contact_name || contact_name === '') {
      // Verifica se o usuário não está tentando limpar o campo
      if (!contact_name) {
        throw new AppError('A contact name must be provided', 401);
      }
      company.contact_name = contact_name;
    }

    if (email || email === '') {
      // Verifica se o usuário não está tentando limpar o campo
      if (!email) {
        throw new AppError('An email must be provided', 401);
      }
      company.email = email;
    }

    if (phone || phone === '') {
      // Verifica se o usuário não está tentando limpar o campo sem que haja outro telefone
      if (phone === '' && !company.mobile && !mobile) {
        throw new AppError(
          'At least a phone or a mobile must be provided',
          401,
        );
      }

      company.phone = phone;
    }

    if (mobile || mobile === '') {
      // Verifica se o usuário não está tentando limpar o campo sem que haja outro telefone
      if (mobile === '' && !company.phone && !phone) {
        throw new AppError(
          'At least a phone or a mobile must be provided',
          401,
        );
      }

      company.mobile = mobile;
    }

    return this.companiesRepository.save(company);
  }
}
