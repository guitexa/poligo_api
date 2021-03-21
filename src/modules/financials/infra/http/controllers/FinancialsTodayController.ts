import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListFinancialsTodayService from '@modules/financials/services/ListFinancialsTodayService';
import { classToClass } from 'class-transformer';

export default class FinancialsTodayController {
  // Função para mostrar os lançamentos financeiros que vencem no dia corrente
  public async show(req: Request, res: Response): Promise<Response> {
    const data = req.query;

    // Realiza injeção de dependência para utilizar o service
    const listFinancialsToday = container.resolve(ListFinancialsTodayService);

    // Executa o service enviando os valores recebidos na query
    const financials = await listFinancialsToday.execute(data);

    // Responde a requisição com o retorno do service
    return res.json(classToClass(financials));
  }
}
