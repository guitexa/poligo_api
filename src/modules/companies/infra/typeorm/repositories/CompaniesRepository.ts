import { Repository, getRepository } from 'typeorm';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '@modules/companies/infra/typeorm/entities/Company';

export default class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  // Função para criar uma company
  public async create(company: ICreateCompanyDTO): Promise<Company> {
    const newCompany = this.ormRepository.create(company);

    await this.ormRepository.save(newCompany);

    return newCompany;
  }

  // Função para procurar todos os companies cadastrados
  public async findAll(): Promise<Company[] | undefined> {
    return this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  // Função para procurar uma company específica pelo ID
  public async findById(company_id: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: {
        id: company_id,
      },
    });

    return company;
  }

  // Função para procurar uma company específica pelo nome
  public async findByName(company_name: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: {
        name: company_name,
      },
    });

    return company;
  }

  // Função para atualizar uma company específica
  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }
}
