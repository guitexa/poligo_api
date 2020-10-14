import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserPasswordService from '@modules/users/services/AuthenticateUserPasswordService';

export default class SessionPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserPassword = container.resolve(
      AuthenticateUserPasswordService,
    );

    const { user, token, permissions } = await authenticateUserPassword.execute(
      {
        email,
        password,
      },
    );

    return res.json({ user, token, permissions });
  }
}
