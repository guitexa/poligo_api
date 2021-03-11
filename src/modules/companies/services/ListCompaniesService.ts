import { inject, injectable } from 'tsyringe';

import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

@injectable()
export default class ListCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  // Função para procurar todas as companies existentes
  public async execute(): Promise<Company[] | undefined> {
    return this.companiesRepository.findAll();
  }
}
