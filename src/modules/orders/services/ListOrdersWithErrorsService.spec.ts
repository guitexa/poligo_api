import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListOrdersWithErrorsService from './ListOrdersWithErrorsService';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let listOrder: ListOrdersWithErrorsService;

describe('ListOrdersWithErrors', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    listOrder = new ListOrdersWithErrorsService(fakeOrdersRepository);
  });

  it('should be able to list orders', async () => {
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

    const orderOne = await fakeOrdersRepository.create({
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

    const orderTwo = await fakeOrdersRepository.create({
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

    const orders = await listOrder.execute({});

    expect(orders).toEqual(expect.arrayContaining([orderOne, orderTwo]));
  });
});
