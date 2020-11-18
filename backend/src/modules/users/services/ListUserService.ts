import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user_id was not found', 404);
    }

    return user;
  }
}
