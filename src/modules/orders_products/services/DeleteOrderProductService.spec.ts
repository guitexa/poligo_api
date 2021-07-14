import AppError from '@shared/errors/AppError';

import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import User from '@modules/users/infra/typeorm/entities/User';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import Product from '@modules/products/infra/typeorm/entities/Product';
import DeleteOrderProductService from './DeleteOrderProductService';
import FakeOrdersProductsRepository from '../repositories/fakes/FakeOrdersProductsRepository';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrdersProductsRepository: FakeOrdersProductsRepository;
let fakeProductsRepository: FakeProductsRepository;
let deleteOrderProduct: DeleteOrderProductService;
let company: Company;
let seller: User;
let product: Product;
let order: Order;
let order_product: OrderProduct;

describe('DeleteOrderProduct', () => {
  beforeEach(async () => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrdersProductsRepository = new FakeOrdersProductsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    deleteOrderProduct = new DeleteOrderProductService(
      fakeOrdersProductsRepository,
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
      technical_obs: '',
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

    await fakeOrdersProductsRepository.create({
      order,
      product_id: product.id,
      product_description: 'This product is good',
      product_value: 200,
    });
  });

  it('should be able to delete an order_product', async () => {
    await deleteOrderProduct.execute(order_product.id);
  });

  it('should NOT be able to delete an order_product with wrong order_product_id', async () => {
    await expect(
      deleteOrderProduct.execute('wrong-order-product-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
