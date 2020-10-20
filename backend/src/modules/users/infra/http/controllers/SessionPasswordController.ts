import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserPasswordService from '@modules/users/services/AuthenticateUserPasswordService';
import { classToClass } from 'class-transformer';

export default class SessionPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserPassword = container.resolve(
      AuthenticateUserPasswordService,
    );

    const { user, token, permission } = await authenticateUserPassword.execute({
      email,
      password,
    });

    return res.json(Object.assign(classToClass(user), { token, permission }));
  }
}
