import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  // Função para procurar um product específico
  public async execute(product_id: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('This product_id was not found', 404);
    }

    return product;
  }
}
