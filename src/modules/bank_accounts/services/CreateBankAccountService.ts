import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import BankAccount from '../infra/typeorm/entities/BankAccount';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';
import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';

@injectable()
export default class CreateBankAccountService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  // Função para criar um bankAccount
  public async execute({ name }: ICreateBankAccountDTO): Promise<BankAccount> {
    const checkIfBankAccountExists = await this.bankAccountsRepository.findByName(
      name,
    );

    if (checkIfBankAccountExists) {
      throw new AppError('This bankAccount already exists', 401);
    }

    const bankAccount = await this.bankAccountsRepository.create({
      name,
    });

    return bankAccount;
  }
}
