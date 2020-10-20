import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ListProductsService from './ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let listProduct: ListProductsService;

describe('ListProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProduct = new ListProductsService(fakeProductsRepository);
  });

  it('should be able to list products', async () => {
    const productOne = await fakeProductsRepository.create({
      name: 'product-one-name',
    });

    const productTwo = await fakeProductsRepository.create({
      name: 'product-two-name',
    });

    const products = await listProduct.execute();

    expect(products).toEqual(expect.arrayContaining([productOne, productTwo]));
  });
});
