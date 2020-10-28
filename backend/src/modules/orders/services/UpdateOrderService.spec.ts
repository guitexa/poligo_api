import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePermissionsRepository from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import FakeOrdersProductsRepository from '../repositories/fakes/FakeOrdersProductsRepository';
import UpdateOrderService from './UpdateOrderService';
import Order from '../infra/typeorm/entities/Order';

let fakeClientsRepository: FakeClientsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrdersProductsRepository: FakeOrdersProductsRepository;
let updateOrder: UpdateOrderService;
let client: Client;
let seller: User;
let technical: User;
let order: Order;
let product: Product;

describe('UpdateOrder', () => {
  beforeEach(async () => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrdersProductsRepository = new FakeOrdersProductsRepository();
    updateOrder = new UpdateOrderService(
      fakeOrdersRepository,
      fakeOrdersProductsRepository,
      fakeClientsRepository,
      fakeUsersRepository,
      fakeProductsRepository,
    );

    client = await fakeClientsRepository.create({
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

    seller = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    technical = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    product = await fakeProductsRepository.create({
      name: 'product-name',
    });

    order = await fakeOrdersRepository.create({
      client_id: client.id,
      seller_id: seller.id,
    });
  });

  it('should be able to update a specific order without product', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      status_order: 'Approved',
      approved_at: new Date('2020-04-10'),
      delivery_conditions: 'Special conditions',
      requested_delivery_date: new Date('2020-05-10'),
      delivery_date: new Date('2020-05-10'),
      product_description: 'This product is very good',
      product_value: 500,
    });

    expect(orderUpdated).toEqual(
      expect.objectContaining({
        order: expect.objectContaining({
          id: order.id,
        }),
        client: expect.objectContaining({
          id: client.id,
        }),
        seller: expect.objectContaining({
          id: seller.id,
        }),
      }),
    );
  });

  it('should be able to update a specific order with product', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      status_order: 'Approved',
      approved_at: new Date('2020-04-10'),
      delivery_conditions: 'Special conditions',
      requested_delivery_date: new Date('2020-05-10'),
      delivery_date: new Date('2020-05-10'),
      product_id: product.id,
      product_description: 'This product is very good',
      product_value: 500,
    });

    expect(orderUpdated).toEqual(
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
      }),
    );
  });

  it('should be able to update a specific order without product and others', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      status_order: 'Approved',
      approved_at: new Date('2020-04-10'),
      delivery_conditions: 'Special conditions',
      requested_delivery_date: new Date('2020-05-10'),
      delivery_date: new Date('2020-05-10'),
      status_delivery: 'Waiting',
      payment_way: 'Long term',
      due_date: 'Usually',
      status_billing: 'Done',
      status_payment: 'Paid',
      technical_id: technical.id,
    });

    expect(orderUpdated).toEqual(
      expect.objectContaining({
        order: expect.objectContaining({
          id: order.id,
        }),
        client: expect.objectContaining({
          id: client.id,
        }),
        seller: expect.objectContaining({
          id: seller.id,
        }),
        technical: expect.objectContaining({
          id: technical.id,
        }),
      }),
    );
  });

  it('should be able to update a specific order with product and others', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      status_order: 'Approved',
      approved_at: new Date('2020-04-10'),
      delivery_conditions: 'Special conditions',
      requested_delivery_date: new Date('2020-05-10'),
      delivery_date: new Date('2020-05-10'),
      status_delivery: 'Waiting',
      payment_way: 'Long term',
      due_date: 'Usually',
      status_billing: 'Done',
      status_payment: 'Paid',
      technical_id: technical.id,
      product_id: product.id,
      product_description: 'This product is very good',
      product_value: 500,
    });

    expect(orderUpdated).toEqual(
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

  it('should be able to update a specific order only with product', async () => {
    const orderUpdated = await updateOrder.execute({
      order_id: order.id,
      product_id: product.id,
      product_description: 'This product is very good',
      product_value: 500,
    });

    expect(orderUpdated).toEqual(
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
      }),
    );
  });

  it('should NOT be able to update a specific order with inexistent product', async () => {
    await expect(
      updateOrder.execute({
        order_id: order.id,
        status_order: 'Approved',
        approved_at: new Date('2020-04-10'),
        delivery_conditions: 'Special conditions',
        requested_delivery_date: new Date('2020-05-10'),
        delivery_date: new Date('2020-05-10'),
        technical_id: technical.id,
        product_id: 'inexistent-product-id',
        product_description: 'This product is very good',
        product_value: 500,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update an order with inexistent id', async () => {
    await expect(
      updateOrder.execute({
        order_id: 'inexistent-order-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update a specific order with product and inexistent technical_id', async () => {
    await expect(
      updateOrder.execute({
        order_id: order.id,
        status_order: 'Approved',
        approved_at: new Date('2020-04-10'),
        delivery_conditions: 'Special conditions',
        requested_delivery_date: new Date('2020-05-10'),
        delivery_date: new Date('2020-05-10'),
        technical_id: 'inexistent-technical-id',
        product_id: product.id,
        product_description: 'This product is very good',
        product_value: 500,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update an order with inexistent id', async () => {
    await expect(
      updateOrder.execute({
        order_id: 'inexistent-order-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update a specific order without product and inexistent technical_id', async () => {
    await expect(
      updateOrder.execute({
        order_id: order.id,
        status_order: 'Approved',
        approved_at: new Date('2020-04-10'),
        delivery_conditions: 'Special conditions',
        requested_delivery_date: new Date('2020-05-10'),
        delivery_date: new Date('2020-05-10'),
        technical_id: 'inexistent-technical-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update an order with inexistent id', async () => {
    await expect(
      updateOrder.execute({
        order_id: 'inexistent-order-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
