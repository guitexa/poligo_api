import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBankAccountService from '@modules/bank_accounts/services/ListBankAccountService';

export default class BankAccountController {
  // Função para mostrar uma conta bancária específica
  public async show(req: Request, res: Response): Promise<Response> {
    const { bank_account_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listBankAccount = container.resolve(ListBankAccountService);

    // Executa o service enviando os valores recebidos no params
    const bank_account = await listBankAccount.execute(bank_account_id);

    // Responde a requisição com o retorno do service
    return res.json(bank_account);
  }
}
