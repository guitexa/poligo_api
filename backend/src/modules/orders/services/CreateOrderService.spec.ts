import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import CreateOrderService from './CreateOrderService';

let fakeClientsRepository: FakeClientsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let createOrder: CreateOrderService;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeClientsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new order', async () => {
    const client = await fakeClientsRepository.create({
      company_name: 'New Company',
      cpf_cnpj: '81023545000115',
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

    const order = await createOrder.execute({
      client_id: client.id,
      seller_id: seller.id,
    });

    expect(order).toHaveProperty('id');
  });

  it('should NOT be able to create a new order for an inexistent client', async () => {
    const seller = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions: 'Admin',
    });

    await expect(
      createOrder.execute({
        client_id: 'inexistent-client-id',
        seller_id: seller.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new order for an inexistent seller', async () => {
    const client = await fakeClientsRepository.create({
      company_name: 'New Company',
      cpf_cnpj: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    await expect(
      createOrder.execute({
        client_id: client.id,
        seller_id: 'inexistent-seller-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
