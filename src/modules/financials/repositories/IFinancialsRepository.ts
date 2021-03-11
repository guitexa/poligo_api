import ICreateFinancialDTO from '../dtos/ICreateFinancialDTO';
import Financial from '../infra/typeorm/entities/Financial';

export default interface IFinancialsRepository {
  create(financial: ICreateFinancialDTO): Promise<Financial>;
}
