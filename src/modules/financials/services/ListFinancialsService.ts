import { inject, injectable } from 'tsyringe';

import IFinancialsRepository from '../repositories/IFinancialsRepository';
import Financial from '../infra/typeorm/entities/Financial';
import IFindAllFinancialsDTO from '../dtos/IFindAllFinancialsDTO';

@injectable()
export default class ListFinancialsService {
  constructor(
    @inject('FinancialsRepository')
    private ordersRepository: IFinancialsRepository,
  ) {}

  // Função para procurar todas as orders cadastradas
  public async execute(
    data: IFindAllFinancialsDTO,
  ): Promise<Financial[] | undefined> {
    return this.ordersRepository.findAll(data);
  }
}
