import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import SearchOrderService from './SearchOrderService';
import Order from '../infra/typeorm/entities/Order';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let searchOrder: SearchOrderService;
let company: Company;
let seller: User;
let order: Order;

describe('SearchOrder', () => {
  beforeEach(async () => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    searchOrder = new SearchOrderService(fakeOrdersRepository);

    company = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    seller = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions: 'Admin',
    });

    order = await fakeOrdersRepository.create({
      company_id: company.id,
      seller_id: seller.id,
      status_order: 'Rascunho',
      status_delivery: '',
      status_billing: '',
      status_payment: '',
      delivery_conditions: '',
      technical_obs: '',
      payment_way: '',
      due_date: '',
      total_value: '',
    });
  });

  it('should be able to search orders', async () => {
    const searchResults = await searchOrder.execute({});

    expect(searchResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: order.id,
        }),
      ]),
    );
  });
});
