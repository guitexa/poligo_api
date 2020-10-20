import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[] | undefined> {
    return this.productsRepository.findAll();
  }
}
