import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import BankAccount from '../infra/typeorm/entities/BankAccount';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

@injectable()
export default class ListBankAccountService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  // Função para procurar uma conta bancária específico
  public async execute(
    bank_account_id: string,
  ): Promise<BankAccount | undefined> {
    const bankAccount = await this.bankAccountsRepository.findById(
      bank_account_id,
    );

    if (!bankAccount) {
      throw new AppError('This bank_account_id was not found', 404);
    }

    return bankAccount;
  }
}
