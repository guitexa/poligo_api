import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      name: 'product-name',
    });

    expect(product).toHaveProperty('id');
  });

  it('should NOT be able to create an existent product', async () => {
    const product = await createProduct.execute({
      name: 'product-name',
    });

    await expect(
      createProduct.execute({
        name: product.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
