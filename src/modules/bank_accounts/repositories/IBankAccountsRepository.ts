import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';
import BankAccount from '../infra/typeorm/entities/BankAccount';

export default interface IBankAccountsRepository {
  create(productData: ICreateBankAccountDTO): Promise<BankAccount>;
  findAll(): Promise<BankAccount[] | undefined>;
  findById(product_id: string): Promise<BankAccount | undefined>;
  findByName(product_name: string): Promise<BankAccount | undefined>;
}
