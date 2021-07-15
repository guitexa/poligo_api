import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  company_id: string;
  seller_id: string;
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  // Função para criar uma order
  public async execute({ company_id, seller_id }: IRequest): Promise<Order> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('This company_id was not found', 404);
    }

    const seller = await this.usersRepository.findById(seller_id);

    if (!seller) {
      throw new AppError('This seller_id was not found', 404);
    }

    // Além do company_id e seller_id envia outros dados para cadastrar uma string vazia no banco ao invés de NULL
    return this.ordersRepository.create({
      company_id,
      seller_id,
      status_order: 'Rascunho',
      status_delivery: '',
      status_billing: '',
      status_payment: '',
      delivery_conditions: '',
      technical_obs: '',
      payment_way: '',
      total_value: '',
    });
  }
}
