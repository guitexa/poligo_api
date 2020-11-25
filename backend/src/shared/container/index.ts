// Container para registrar as injeções de dependências dos repositórios

import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import OrdersProductsRepository from '@modules/orders/infra/typeorm/repositories/OrdersProductsRepository';
import IOrdersProductsRepository from '@modules/orders/repositories/IOrdersProductsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
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
