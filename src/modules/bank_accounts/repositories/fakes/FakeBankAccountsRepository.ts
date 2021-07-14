import { v4 } from 'uuid';

import IBankAccountsRepository from '@modules/bank_accounts/repositories/IBankAccountsRepository';
import ICreateBankAccountDTO from '@modules/bank_accounts/dtos/ICreateBankAccountDTO';
import BankAccount from '../../infra/typeorm/entities/BankAccount';

export default class FakeBankAccountsRepository
  implements IBankAccountsRepository
{
  private bankAccountRepository: BankAccount[] = [];

  public async create(
    bankAccountData: ICreateBankAccountDTO,
  ): Promise<BankAccount> {
    const bankAccount = new BankAccount();

    Object.assign(bankAccount, { id: v4() }, bankAccountData);

    this.bankAccountRepository.push(bankAccount);

    return bankAccount;
  }

  public async findAll(): Promise<BankAccount[] | undefined> {
    return this.bankAccountRepository;
  }

  public async findById(
    bankAccount_id: string,
  ): Promise<BankAccount | undefined> {
    return this.bankAccountRepository.find(
      bankAccount => bankAccount.id === bankAccount_id,
    );
  }

  public async findByName(
    bankAccount_name: string,
  ): Promise<BankAccount | undefined> {
    return this.bankAccountRepository.find(
      bankAccount => bankAccount.name === bankAccount_name,
    );
  }
}
