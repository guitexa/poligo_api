import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ListProductService from './ListProductService';

let fakeProductsRepository: FakeProductsRepository;
let listProduct: ListProductService;

describe('ListProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProduct = new ListProductService(fakeProductsRepository);
  });

  it('should be able to list a specific product', async () => {
    const productOne = await fakeProductsRepository.create({
      name: 'product-one-name',
    });

    const products = await listProduct.execute(productOne.id);

    expect(products).toEqual(expect.objectContaining(productOne));
  });

  it('should NOT be able to list with inexistent product', async () => {
    await expect(
      listProduct.execute('inexistent-product-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
