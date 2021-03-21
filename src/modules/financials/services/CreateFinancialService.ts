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
  public async execute(
    data: ICreateFinancialDTO,
  ): Promise<Financial | undefined> {
    const company = await this.companiesRepository.findById(data.company_id);

    if (!company) {
      throw new AppError('This company_id was not found', 404);
    }

    if (data.order_id) {
      const order = await this.ordersRepository.findById(data.order_id);

      if (!order) {
        throw new AppError('This order_id was not found', 404);
      }
    }

    const user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new AppError('This user_id was not found', 404);
    }

    // Cria o lançamento financeiro
    const financial = await this.financialsRepository.create(data);

    // Converte os números em strings e atualiza campos de pesquisa
    if (financial.gross_value) {
      financial.gross_value_string = String(financial.gross_value).replace(
        /[/.]/gi,
        ',',
      );
    }

    if (financial.net_value) {
      financial.net_value_string = String(financial.net_value).replace(
        /[/.]/gi,
        ',',
      );
    }

    if (financial.paid_value) {
      financial.paid_value_string = String(financial.paid_value).replace(
        /[/.]/gi,
        ',',
      );
    }

    if (financial.fee_value) {
      financial.fee_value_string = String(financial.fee_value).replace(
        /[/.]/gi,
        ',',
      );
    }

    if (financial.updated_value) {
      financial.updated_value_string = String(financial.updated_value).replace(
        /[/.]/gi,
        ',',
      );
    }

    await this.financialsRepository.save(financial);

    // Retorna o lançamento financeiro atualizado
    return this.financialsRepository.findById(financial.id);
  }
}
