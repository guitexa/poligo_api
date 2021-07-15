import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';
import BankAccount from '../infra/typeorm/entities/BankAccount';

export default interface IBankAccountsRepository {
  create(bankData: ICreateBankAccountDTO): Promise<BankAccount>;
  findAll(): Promise<BankAccount[] | undefined>;
  findById(bank_id: string): Promise<BankAccount | undefined>;
  findByName(bank_name: string): Promise<BankAccount | undefined>;
}
