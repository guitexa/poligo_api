import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePermissionsRepository from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import FakeOrdersProductsRepository from '../repositories/fakes/FakeOrdersProductsRepository';
import ListOrderService from './ListOrderService';
import UpdateOrderService from './UpdateOrderService';

let fakeClientsRepository: FakeClientsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrdersProductsRepository: FakeOrdersProductsRepository;
let listOrder: ListOrderService;
let updateOrder: UpdateOrderService;

describe('ListOrder', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrdersProductsRepository = new FakeOrdersProductsRepository();
    listOrder = new ListOrderService(
      fakeOrdersRepository,
      fakeOrdersProductsRepository,
      fakeClientsRepository,
      fakeUsersRepository,
    );
    updateOrder = new UpdateOrderService(
      fakeOrdersRepository,
      fakeOrdersProductsRepository,
      fakeClientsRepository,
      fakeUsersRepository,
      fakeProductsRepository,
    );
  });

  it('should be able to list one specific order', async () => {
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

    const order = await fakeOrdersRepository.create({
      client_id: client.id,
      seller_id: seller.id,
    });

    const orders = await listOrder.execute(order.id);

    expect(orders).toEqual(
      expect.objectContaining({
        client: expect.objectContaining({
          id: client.id,
        }),
        seller: expect.objectContaining({
          id: seller.id,
        }),
      }),
    );
  });

  it('should be able to list one specific order updated', async () => {
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

    const technical = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    const product = await fakeProductsRepository.create({
      name: 'product-name',
    });

    const order = await fakeOrdersRepository.create({
      client_id: client.id,
      seller_id: seller.id,
    });

    await updateOrder.execute({
      order_id: order.id,
      status_order: 'Approved',
      approved_at: new Date('2020-04-10'),
      delivery_conditions: 'Special conditions',
      requested_delivery_date: new Date('2020-05-10'),
      delivery_date: new Date('2020-05-10'),
      technical_id: technical.id,
      product_id: product.id,
      product_description: 'This product is very good',
      product_value: 500,
    });

    const orders = await listOrder.execute(order.id);

    expect(orders).toEqual(
      expect.objectContaining({
        order: expect.objectContaining({
          id: order.id,
        }),
        client: expect.objectContaining({
          id: client.id,
        }),
        products: expect.arrayContaining([
          expect.objectContaining({
            product_id: product.id,
          }),
        ]),
        seller: expect.objectContaining({
          id: seller.id,
        }),
        technical: expect.objectContaining({
          id: technical.id,
        }),
      }),
    );
  });

  it('should NOT be able to list an order with inexistent id', async () => {
    await expect(
      listOrder.execute('inexistent-order-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
