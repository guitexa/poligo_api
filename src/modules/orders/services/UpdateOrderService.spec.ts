import AppError from '@shared/errors/AppError';

import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import UpdateOrderService from './UpdateOrderService';
import Order from '../infra/typeorm/entities/Order';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let updateOrder: UpdateOrderService;
let company: Company;
let seller: User;
let technical: User;
let order: Order;

describe('UpdateOrder', () => {
  beforeEach(async () => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    updateOrder = new UpdateOrderService(
      fakeOrdersRepository,
      fakeUsersRepository,
    );

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

    technical = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
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
      total_value: '',
    });
  });

  it('should be able to update a specific order', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      status_order: 'Approved',
      approved_at: new Date('2020-04-10'),
      delivery_conditions: 'Special conditions',
      technical_obs: '',
      requested_delivery_date: new Date('2020-05-10'),
      delivery_date: new Date('2020-05-10'),
      status_delivery: 'Waiting',
      payment_way: 'Long term',
      status_billing: 'Done',
      status_payment: 'Paid',
    });

    expect(orderUpdated).toEqual(
      expect.objectContaining({
        id: order.id,
        company_id: company.id,
        seller_id: seller.id,
      }),
    );
  });

  it('should be able to update a specific order with technical_id', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      technical_id: technical.id,
    });

    expect(orderUpdated).toEqual(
      expect.objectContaining({
        id: order.id,
        company_id: company.id,
        seller_id: seller.id,
        technical_id: technical.id,
      }),
    );
  });

  it('should be able to update a specific order to delete technical', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      technical_id: null,
    });

    expect(orderUpdated).toEqual(
      expect.objectContaining({
        id: order.id,
        company_id: company.id,
        seller_id: seller.id,
        technical_id: null,
      }),
    );
  });

  it('should NOT be able to update a specific order with an inexistent technical_id', async () => {
    await expect(
      updateOrder.execute({
        order_id: order.id,
        technical_id: 'inexistent-technical-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update an order with inexistent order_id', async () => {
    await expect(
      updateOrder.execute({
        order_id: 'inexistent-order-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
