import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Financial from '../infra/typeorm/entities/Financial';
import IFinancialsRepository from '../repositories/IFinancialsRepository';
import ICreateFinancialDTO from '../dtos/ICreateFinancialDTO';

@injectable()
export default class CreateFinancialService {
  constructor(
    @inject('FinancialsRepository')
    private financialsRepository: IFinancialsRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  // Função para criar um lançamento financeiro
  public async execute(data: ICreateFinancialDTO): Promise<Financial> {
    const company = await this.companiesRepository.findById(data.company_id);

    if (!company) {
      throw new AppError('This company_id was not found', 404);
    }

    const order = await this.ordersRepository.findById(data.order_id);

    if (!order) {
      throw new AppError('This order_id was not found', 404);
    }

    const user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new AppError('This user_id was not found', 404);
    }

    // Calcular no frontend o updated_value como sugestão e pode ser editado

    return this.financialsRepository.create(data);
  }
}
