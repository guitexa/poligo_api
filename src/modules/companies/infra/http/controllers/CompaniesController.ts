import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import ListCompaniesService from '@modules/companies/services/ListCompaniesService';

export default class CompaniesController {
  // Função para criar uma nova company
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cnpj_cpf, contact_name, email, phone, mobile } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createCompany = container.resolve(CreateCompanyService);

    // Executa o service enviando os valores recebidos no body
    const company = await createCompany.execute({
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

  // Função para mostrar todas as companies cadastradas
  public async show(req: Request, res: Response): Promise<Response> {
    // Realiza injeção de dependência para utilizar o service
    const listCompanies = container.resolve(ListCompaniesService);

    // Executa o service
    const companies = await listCompanies.execute();

    // Responde a requisição com o retorno do service
    return res.json(companies);
  }
}
