import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchFinancialService from '@modules/financials/services/SearchFinancialService';
import { classToClass } from 'class-transformer';

export default class SearchFinancialController {
  // Função para buscar informações dentro dos pedidos
  public async show(req: Request, res: Response): Promise<Response> {
    const searchData = req.query;

    // Realiza injeção de dependência para utilizar o service
    const searchFinancial = container.resolve(SearchFinancialService);

    // Executa o service enviando os valores recebidos no query
    const financials = await searchFinancial.execute(searchData);

    // Responde a requisição com o retorno do service
    return res.json(classToClass(financials));
  }
}
