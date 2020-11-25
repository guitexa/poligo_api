import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  // Função para criar um user
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, permissions } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createUser = container.resolve(CreateUserService);

    // Executa o service enviando os valores recebidos no params
    const user = await createUser.execute({
      name,
      email,
      password,
      permissions,
    });

    // Responde a requisição com o retorno do service
    return res.json(classToClass(user));
  }

  // Função para mostrar todos os users cadastrados
  public async show(req: Request, res: Response): Promise<Response> {
    // Realiza injeção de dependência para utilizar o service
    const listUsers = container.resolve(ListUsersService);

    // Executa o service enviando os valores recebidos no params
    const users = await listUsers.execute();

    // Responde a requisição com o retorno do service
    return res.json(classToClass(users));
  }
}
