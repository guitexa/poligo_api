import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserServices from '@modules/users/services/CreateUserServices';
import ListUsersServices from '@modules/users/services/ListUsersServices';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, permissions_id } = req.body;

    const createUser = container.resolve(CreateUserServices);

    const user = await createUser.execute({
      name,
      email,
      password,
      permissions_id,
    });

    return res.json(classToClass(user));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersServices);

    const users = await listUsers.execute();

    return res.json(classToClass(users));
  }
}
