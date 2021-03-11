import { v4 } from 'uuid';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '../../infra/typeorm/entities/Company';

export default class FakeCompaniesRepository implements ICompaniesRepository {
  private companyRepository: Company[] = [];

  public async create(companyData: ICreateCompanyDTO): Promise<Company> {
    const company = new Company();

    Object.assign(company, { id: v4() }, companyData);

    this.companyRepository.push(company);

    return company;
  }

  public async findAll(): Promise<Company[] | undefined> {
    return this.companyRepository;
  }

  public async findById(company_id: string): Promise<Company | undefined> {
    return this.companyRepository.find(company => company.id === company_id);
  }

  public async findByName(company_name: string): Promise<Company | undefined> {
    return this.companyRepository.find(
      company => company.name === company_name,
    );
  }

  public async save(company: Company): Promise<Company> {
    return company;
  }
}
