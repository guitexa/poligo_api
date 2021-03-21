// Container para registrar as injeções de dependências dos repositórios

import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import OrdersProductsRepository from '@modules/orders_products/infra/typeorm/repositories/OrdersProductsRepository';
import IOrdersProductsRepository from '@modules/orders_products/repositories/IOrdersProductsRepository';

import FinancialsRepository from '@modules/financials/infra/typeorm/repositories/FinancialsRepository';
import IFinancialsRepository from '@modules/financials/repositories/IFinancialsRepository';

import BankAccountsRepository from '@modules/bank_accounts/infra/typeorm/repositories/BankAccountsRepository';
import IBankAccountsRepository from '@modules/bank_accounts/repositories/IBankAccountsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IOrdersProductsRepository>(
  'OrdersProductsRepository',
  OrdersProductsRepository,
);

container.registerSingleton<IFinancialsRepository>(
  'FinancialsRepository',
  FinancialsRepository,
);

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);
