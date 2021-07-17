import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

@injectable()
export default class ListCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  // Função para procurar uma company específica pelo ID
  public async execute(company_id: string): Promise<Company | undefined> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('This company id was not found', 404);
    }

    return company;
  }
}
