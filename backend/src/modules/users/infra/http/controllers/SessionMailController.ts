import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserMailService from '@modules/users/services/AuthenticateUserMailService';

export default class SessionMailController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const authenticateUserMail = container.resolve(AuthenticateUserMailService);

    const user = await authenticateUserMail.execute({
      email,
    });

    delete user.password;

    return res.json(user);
  }
}
