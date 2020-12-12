import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserMailService from '@modules/users/services/AuthenticateUserMailService';
import { classToClass } from 'class-transformer';

export default class SessionMailController {
  // Função para realizar a primeira autenticação do user apenas com e-mail
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const authenticateUserMail = container.resolve(AuthenticateUserMailService);

    // Executa o service enviando os valores recebidos no body
    const user = await authenticateUserMail.execute({
      email,
    });

    // Responde a requisição com o retorno do service
    return res.json(classToClass(user));
  }
}
