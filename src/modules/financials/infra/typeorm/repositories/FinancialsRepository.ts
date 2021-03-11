import { Repository, getRepository } from 'typeorm';

import IFinancialsRepository from '@modules/financials/repositories/IFinancialsRepository';
import ICreateFinancialDTO from '@modules/financials/dtos/ICreateFinancialDTO';
import Financial from '../entities/Financial';

export default class FinancialsRepository implements IFinancialsRepository {
  private ormRepository: Repository<Financial>;

  constructor() {
    this.ormRepository = getRepository(Financial);
  }

  // Função para criar um lançamento financeiro
  public async create(financial: ICreateFinancialDTO): Promise<Financial> {
    const newFinancial = this.ormRepository.create(financial);

    await this.ormRepository.save(newFinancial);

    return newFinancial;
  }
}
