import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFinancialService from '@modules/financials/services/CreateFinancialService';
import ListFinancialsService from '@modules/financials/services/ListFinancialsService';
// import { classToClass } from 'class-transformer';

export default class FinancialsController {
  // Função para criar um lançamento financeiro
  public async create(req: Request, res: Response): Promise<Response> {
    // const { company_id } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createFinancial = container.resolve(CreateFinancialService);

    // Executa o service enviando os valores recebidos no body
    const financial = await createFinancial.execute(req.body);

    // Responde a requisição com o retorno do service
    return res.json(financial);
  }

  // Função para mostrar todos os lançamentos financeiros cadastrados
  public async show(req: Request, res: Response): Promise<Response> {
    const data = req.query;

    // Realiza injeção de dependência para utilizar o service
    const listFinancials = container.resolve(ListFinancialsService);

    // Executa o service enviando os valores recebidos no body
    const financials = await listFinancials.execute(data);

    // Responde a requisição com o retorno do service
    return res.json(financials);
  }
}
