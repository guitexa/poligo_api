import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserService from '@modules/users/services/ListUserService';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const listUser = container.resolve(ListUserService);

    const user = await listUser.execute(user_id);

    return res.json(classToClass(user));
  }
}
