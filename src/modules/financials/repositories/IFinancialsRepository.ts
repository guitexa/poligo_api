import ICreateFinancialDTO from '../dtos/ICreateFinancialDTO';
import IFindAllFinancialsDTO from '../dtos/IFindAllFinancialsDTO';
import ISearchFinancialDTO from '../dtos/ISearchFinancialDTO';
import Financial from '../infra/typeorm/entities/Financial';

export default interface IFinancialsRepository {
  create(financial: ICreateFinancialDTO): Promise<Financial>;
  findAll(data: IFindAllFinancialsDTO): Promise<Financial[] | undefined>;
  findById(financial_id: string): Promise<Financial | undefined>;
  findAllTodayDueDate(
    data: IFindAllFinancialsDTO,
  ): Promise<Financial[] | undefined>;
  save(financial: Financial): Promise<Financial>;
  search(search: ISearchFinancialDTO): Promise<Financial[] | undefined>;
}
