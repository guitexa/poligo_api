import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserPasswordService from '@modules/users/services/AuthenticateUserPasswordService';
import { classToClass } from 'class-transformer';

export default class SessionPasswordController {
  // Função para realizar a segunda autenticação do user com e-mail e senha
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const authenticateUserPassword = container.resolve(
      AuthenticateUserPasswordService,
    );

    // Executa o service enviando os valores recebidos no params
    const { user, token } = await authenticateUserPassword.execute({
      email,
      password,
    });

    // Responde a requisição com o retorno do service
    return res.json(Object.assign(classToClass(user), { token }));
  }
}
