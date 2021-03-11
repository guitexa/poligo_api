import AppError from '@shared/errors/AppError';

import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import Product from '@modules/products/infra/typeorm/entities/Product';
import CreateOrderProductService from './CreateOrderProductService';
import FakeOrdersProductsRepository from '../repositories/fakes/FakeOrdersProductsRepository';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrdersProductsRepository: FakeOrdersProductsRepository;
let fakeProductsRepository: FakeProductsRepository;
let createOrderProduct: CreateOrderProductService;
let company: Company;
let seller: User;
let product: Product;
let order: Order;

describe('CreateOrderProduct', () => {
  beforeEach(async () => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrdersProductsRepository = new FakeOrdersProductsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    createOrderProduct = new CreateOrderProductService(
      fakeOrdersProductsRepository,
      fakeProductsRepository,
      fakeOrdersRepository,
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

    product = await fakeProductsRepository.create({
      name: 'product-name',
    });

    order = await fakeOrdersRepository.create({
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
  });

  it('should be able to create a new order_product', async () => {
    const order_product = await createOrderProduct.execute({
      order_id: order.id,
      product_id: product.id,
      product_description: 'This product is good',
      product_value: 100,
    });

    expect(order_product).toHaveProperty('id');
  });

  it('should NOT be able to create an order_product with wrong order_id', async () => {
    await expect(
      createOrderProduct.execute({
        order_id: 'wrong-order-id',
        product_id: product.id,
        product_description: 'This product is good',
        product_value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an order_product with wrong product_id', async () => {
    await expect(
      createOrderProduct.execute({
        order_id: order.id,
        product_id: 'wrong-product-id',
        product_description: 'This product is good',
        product_value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an order_product with wrong value', async () => {
    await expect(
      createOrderProduct.execute({
        order_id: order.id,
        product_id: product.id,
        product_description: 'This product is good',
        product_value: -1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
