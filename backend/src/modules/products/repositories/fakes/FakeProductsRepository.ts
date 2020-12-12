import { v4 } from 'uuid';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../../infra/typeorm/entities/Product';

export default class FakeProductsRepository implements IProductsRepository {
  private productRepository: Product[] = [];

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: v4() }, productData);

    this.productRepository.push(product);

    return product;
  }

  public async findAll(): Promise<Product[] | undefined> {
    return this.productRepository;
  }

  public async findById(product_id: string): Promise<Product | undefined> {
    return this.productRepository.find(product => product.id === product_id);
  }

  public async findByName(product_name: string): Promise<Product | undefined> {
    return this.productRepository.find(
      product => product.name === product_name,
    );
  }
}
