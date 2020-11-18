import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class AuthenticateUserMailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This email is not valid', 401);
    }

    return user;
  }
}
