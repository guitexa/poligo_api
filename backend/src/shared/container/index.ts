import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import PermissionsRepository from '@modules/permissions/infra/typeorm/repositories/PermissionsRepository';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);
