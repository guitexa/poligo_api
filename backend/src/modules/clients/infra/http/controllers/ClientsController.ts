import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import ListClientsService from '@modules/clients/services/ListClientsService';

export default class ClientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cpf_cnpj, phone, contacts_id } = req.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      name,
      cpf_cnpj,
      phone,
      contacts_id,
    });

    return res.json(client);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listClients = container.resolve(ListClientsService);

    const clients = await listClients.execute();

    return res.json(clients);
  }
}
