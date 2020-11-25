import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserService from '@modules/users/services/ListUserService';
import { classToClass } from 'class-transformer';

export default class UserController {
  // Função para mostrar um user específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listUser = container.resolve(ListUserService);

    // Executa o service enviando os valores recebidos no params
    const user = await listUser.execute(user_id);

    // Responde a requisição com o retorno do service
    return res.json(classToClass(user));
  }
}
