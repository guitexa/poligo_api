import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListClientService from '@modules/clients/services/ListClientService';

export default class ClientController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { client_id } = req.params;

    const listClient = container.resolve(ListClientService);

    const client = await listClient.execute(client_id);

    return res.json(client);
  }
}
