import { Repository, getRepository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async findAll(): Promise<Product[] | undefined> {
    return this.ormRepository.find();
  }

  public async findById(product_id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id: product_id,
      },
    });

    return product;
  }

  public async findByName(product_name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name: product_name,
      },
    });

    return product;
  }
}
