import AppError from '@shared/errors/AppError';

import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListOrderService from './ListOrderService';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let listOrder: ListOrderService;

describe('ListOrder', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    listOrder = new ListOrderService(fakeOrdersRepository);
  });

  it('should be able to list one specific order', async () => {
    const company = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const seller = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions: 'Admin',
    });

    const newOrder = await fakeOrdersRepository.create({
      company_id: company.id,
      seller_id: seller.id,
      status_order: 'Rascunho',
      status_delivery: '',
      status_billing: '',
      status_payment: '',
      delivery_conditions: '',
      payment_way: '',
      due_date: '',
      total_value: '',
    });

    const order = await listOrder.execute(newOrder.id);

    expect(order).toHaveProperty('id');
  });

  it('should NOT be able to list an order with inexistent id', async () => {
    await expect(
      listOrder.execute('inexistent-order-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
