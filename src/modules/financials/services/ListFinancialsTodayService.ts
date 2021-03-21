import { inject, injectable } from 'tsyringe';

import IFinancialsRepository from '../repositories/IFinancialsRepository';
import Financial from '../infra/typeorm/entities/Financial';
import IFindAllFinancialsDTO from '../dtos/IFindAllFinancialsDTO';

@injectable()
export default class ListFinancialsTodayService {
  constructor(
    @inject('FinancialsRepository')
    private financialsRepository: IFinancialsRepository,
  ) {}

  // Função para mostrar os lançamentos financeiros que vencem no dia corrente
  public async execute(
    data: IFindAllFinancialsDTO,
  ): Promise<Financial[] | undefined> {
    return this.financialsRepository.findAllTodayDueDate(data);
  }
}
