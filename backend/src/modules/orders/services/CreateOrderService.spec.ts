import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import CreateOrderService from './CreateOrderService';

let fakeOrdersRepository: FakeOrdersRepository;
let createOrder: CreateOrderService;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    createOrder = new CreateOrderService(fakeOrdersRepository);
  });

  it('should be able to create a new order', async () => {
    const order = await createOrder.execute({});

    expect(order).toHaveProperty('id');
  });
});
