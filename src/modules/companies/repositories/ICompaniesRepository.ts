import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompaniesRepository {
  create(company: ICreateCompanyDTO): Promise<Company>;
  findAll(): Promise<Company[] | undefined>;
  findById(company_id: string): Promise<Company | undefined>;
  findByName(company_name: string): Promise<Company | undefined>;
  save(company: Company): Promise<Company>;
}
