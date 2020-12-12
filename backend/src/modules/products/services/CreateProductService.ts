import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  // Função para criar um product
  public async execute({ name }: ICreateProductDTO): Promise<Product> {
    const checkIfProductExists = await this.productsRepository.findByName(name);

    if (checkIfProductExists) {
      throw new AppError('This product already exists', 401);
    }

    const product = await this.productsRepository.create({
      name,
    });

    return product;
  }
}
