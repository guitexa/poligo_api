import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name }: ICreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
    });

    return product;
  }
}
