import { Repository, getRepository } from 'typeorm';

import IBankAccountsRepository from '@modules/bank_accounts/repositories/IBankAccountsRepository';
import ICreateBankAccountDTO from '@modules/bank_accounts/dtos/ICreateBankAccountDTO';
import BankAccount from '@modules/bank_accounts/infra/typeorm/entities/BankAccount';

export default class BankAccountsRepository implements IBankAccountsRepository {
  private ormRepository: Repository<BankAccount>;

  constructor() {
    this.ormRepository = getRepository(BankAccount);
  }

  // Função para criar um bankAccount
  public async create(
    bankAccountData: ICreateBankAccountDTO,
  ): Promise<BankAccount> {
    const bankAccount = this.ormRepository.create(bankAccountData);

    await this.ormRepository.save(bankAccount);

    return bankAccount;
  }

  // Função para mostrar todos os bankAccounts cadastrados
  public async findAll(): Promise<BankAccount[] | undefined> {
    return this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  // Função para procurar um bankAccount específico pelo ID
  public async findById(
    bankAccount_id: string,
  ): Promise<BankAccount | undefined> {
    const bankAccount = await this.ormRepository.findOne({
      where: {
        id: bankAccount_id,
      },
    });

    return bankAccount;
  }

  // Função para procurar um bankAccount específico pelo nome
  public async findByName(
    bankAccount_name: string,
  ): Promise<BankAccount | undefined> {
    const bankAccount = await this.ormRepository.findOne({
      where: {
        name: bankAccount_name,
      },
    });

    return bankAccount;
  }
}
