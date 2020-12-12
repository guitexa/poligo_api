import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import ListClientsService from '@modules/clients/services/ListClientsService';

export default class ClientsController {
  // Função para criar um novo cliente
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cnpj_cpf, contact_name, email, phone, mobile } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createClient = container.resolve(CreateClientService);

    // Executa o service enviando os valores recebidos no body
    const client = await createClient.execute({
      name,
      cnpj_cpf,
      contact_name,
      email,
      phone,
      mobile,
    });

    // Responde a requisição com o retorno do service
    return res.json(client);
  }

  // Função para mostrar todos os clientes cadastrados
  public async show(req: Request, res: Response): Promise<Response> {
    // Realiza injeção de dependência para utilizar o service
    const listClients = container.resolve(ListClientsService);

    // Executa o service
    const clients = await listClients.execute();

    // Responde a requisição com o retorno do service
    return res.json(clients);
  }
}
