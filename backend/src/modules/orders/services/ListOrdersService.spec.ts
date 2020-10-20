import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListOrdersService from './ListOrdersService';

let fakeOrdersRepository: FakeOrdersRepository;
let listOrder: ListOrdersService;

describe('ListOrders', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    listOrder = new ListOrdersService(fakeOrdersRepository);
  });

  it('should be able to list orders', async () => {
    const orderOne = await fakeOrdersRepository.create({});

    const orderTwo = await fakeOrdersRepository.create({});

    const orders = await listOrder.execute();

    expect(orders).toEqual(expect.arrayContaining([orderOne, orderTwo]));
  });
});
