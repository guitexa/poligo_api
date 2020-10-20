import { uuid } from 'uuidv4';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../../infra/typeorm/entities/Product';

export default class FakeProductsRepository implements IProductsRepository {
  private productRepository: Product[] = [];

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, productData);

    this.productRepository.push(product);

    return product;
  }

  public async findAll(): Promise<Product[] | undefined> {
    return this.productRepository;
  }
}
