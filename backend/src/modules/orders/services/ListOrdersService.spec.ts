import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePermissionsRepository from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListOrdersService from './ListOrdersService';

let fakeClientsRepository: FakeClientsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let listOrder: ListOrdersService;

describe('ListOrders', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    listOrder = new ListOrdersService(fakeOrdersRepository);
  });

  it('should be able to list orders', async () => {
    const client = await fakeClientsRepository.create({
      company_name: 'New Company',
      cpf_cnpj: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const permission = await fakePermissionsRepository.create({
      name: 'permission-name',
    });

    const seller = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    const orderOne = await fakeOrdersRepository.create({
      client_id: client.id,
      seller_id: seller.id,
    });

    const orderTwo = await fakeOrdersRepository.create({
      client_id: client.id,
      seller_id: seller.id,
    });

    const orders = await listOrder.execute();

    expect(orders).toEqual(expect.arrayContaining([orderOne, orderTwo]));
  });
});
