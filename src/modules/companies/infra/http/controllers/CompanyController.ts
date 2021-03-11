import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCompanyService from '@modules/companies/services/ListCompanyService';
import UpdateCompanyService from '@modules/companies/services/UpdateCompanyService';

export default class CompanyController {
  // Função para mostrar uma company específica
  public async show(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listCompany = container.resolve(ListCompanyService);

    // Executa o service enviando os valores recebidos no params
    const company = await listCompany.execute(company_id);

    // Responde a requisição com o retorno do service
    return res.json(company);
  }

  // Função para atualizar uma company específica
  public async update(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;

    const { name, cnpj_cpf, contact_name, email, phone, mobile } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const updateCompany = container.resolve(UpdateCompanyService);

    // Executa o service enviando os valores recebidos no params
    const company = await updateCompany.execute({
      id: company_id,
      name,
      cnpj_cpf,
      contact_name,
      email,
      phone,
      mobile,
    });

    // Responde a requisição com o retorno do service
    return res.json(company);
  }
}
