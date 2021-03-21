import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBankAccountService from '@modules/bank_accounts/services/CreateBankAccountService';
import ListBankAccountsService from '@modules/bank_accounts/services/ListBankAccountsService';

export default class BankAccountsController {
  // Função para criar uma nova conta bancária
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createBankAccount = container.resolve(CreateBankAccountService);

    // Executa o service enviando os valores recebidos no params
    const bank_account = await createBankAccount.execute({
      name,
    });

    // Responde a requisição com o retorno do service
    return res.json(bank_account);
  }

  // Função para mostrar as contas bancárias cadastradas
  public async show(req: Request, res: Response): Promise<Response> {
    // Realiza injeção de dependência para utilizar o service
    const listBankAccounts = container.resolve(ListBankAccountsService);

    // Executa o service
    const bank_accounts = await listBankAccounts.execute();

    // Responde a requisição com o retorno do service
    return res.json(bank_accounts);
  }
}
