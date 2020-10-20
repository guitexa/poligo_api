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
});
