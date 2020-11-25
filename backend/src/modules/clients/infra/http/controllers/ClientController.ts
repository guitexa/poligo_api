import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListClientService from '@modules/clients/services/ListClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';

export default class ClientController {
  // Função para mostrar um cliente específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { client_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listClient = container.resolve(ListClientService);

    // Executa o service enviando os valores recebidos no params
    const client = await listClient.execute(client_id);

    // Responde a requisição com o retorno do service
    return res.json(client);
  }

  // Função para atualizar um cliente específico
  public async update(req: Request, res: Response): Promise<Response> {
    const { client_id } = req.params;

    const { name, cpf_cnpj, contact_name, email, phone, mobile } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const updateClient = container.resolve(UpdateClientService);

    // Executa o service enviando os valores recebidos no params
    const client = await updateClient.execute({
      id: client_id,
      name,
      cpf_cnpj,
      contact_name,
      email,
      phone,
      mobile,
    });

    // Responde a requisição com o retorno do service
    return res.json(client);
  }
}
