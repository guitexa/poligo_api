import { inject, injectable } from 'tsyringe';

import BankAccount from '../infra/typeorm/entities/BankAccount';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

@injectable()
export default class ListBankAccountsService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  // Função para procurar todos as contas bancárias cadastrados
  public async execute(): Promise<BankAccount[] | undefined> {
    return this.bankAccountsRepository.findAll();
  }
}
