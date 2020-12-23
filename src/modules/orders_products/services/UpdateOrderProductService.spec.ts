import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Product from '@modules/products/infra/typeorm/entities/Product';
import UpdateOrderProductService from './UpdateOrderProductService';
import FakeOrdersProductsRepository from '../repositories/fakes/FakeOrdersProductsRepository';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';

let fakeClientsRepository: FakeClientsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrdersProductsRepository: FakeOrdersProductsRepository;
let fakeProductsRepository: FakeProductsRepository;
let updateOrderProduct: UpdateOrderProductService;
let client: Client;
let seller: User;
let product: Product;
let order: Order;
let order_product: OrderProduct;

describe('UpdateOrderProduct', () => {
  beforeEach(async () => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrdersProductsRepository = new FakeOrdersProductsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    updateOrderProduct = new UpdateOrderProductService(
      fakeOrdersProductsRepository,
      fakeProductsRepository,
      fakeOrdersRepository,
    );

    client = await fakeClientsRepository.create({
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

    product = await fakeProductsRepository.create({
      name: 'product-name',
    });

    order = await fakeOrdersRepository.create({
      client_id: client.id,
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

    order_product = await fakeOrdersProductsRepository.create({
      order,
      product_id: product.id,
      product_description: 'This product is good',
      product_value: 100,
    });
  });

  it('should be able to update an existent order_product', async () => {
    await updateOrderProduct.execute({
      order_product_id: order_product.id,
      product_id: product.id,
      product_description: '',
      product_value: 0,
    });

    expect(order_product).toEqual(
      expect.objectContaining({
        product_value: 0,
      }),
    );
  });

  it('should be able to update an existent order_product with a new product', async () => {
    const newProduct = await fakeProductsRepository.create({
      name: 'new-product-name',
    });

    await updateOrderProduct.execute({
      order_product_id: order_product.id,
      product_id: newProduct.id,
      product_description: '',
      product_value: 100,
    });

    expect(order_product.product).toEqual(
      expect.objectContaining({
        id: newProduct.id,
      }),
    );
  });

  it('should NOT be able to update an order_product with wrong order_product_id', async () => {
    await expect(
      updateOrderProduct.execute({
        order_product_id: 'wrong-order-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update an order_product with wrong product_id', async () => {
    await expect(
      updateOrderProduct.execute({
        order_product_id: order_product.id,
        product_id: 'wrong-product-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
