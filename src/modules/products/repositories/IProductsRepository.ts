import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  create(productData: ICreateProductDTO): Promise<Product>;
  findAll(): Promise<Product[] | undefined>;
  findById(product_id: string): Promise<Product | undefined>;
  findByName(product_name: string): Promise<Product | undefined>;
}
