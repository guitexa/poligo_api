import { inject, injectable } from 'tsyringe';

import IFinancialsRepository from '../repositories/IFinancialsRepository';
import Financial from '../infra/typeorm/entities/Financial';
import ISearchFinancialDTO from '../dtos/ISearchFinancialDTO';

@injectable()
export default class SearchFinancialService {
  constructor(
    @inject('FinancialsRepository')
    private ordersRepository: IFinancialsRepository,
  ) {}

  // Função para procurar informações dentro das orders existentes
  public async execute(
    searchData: ISearchFinancialDTO,
  ): Promise<Financial[] | undefined> {
    return this.ordersRepository.search(searchData);
  }
}
