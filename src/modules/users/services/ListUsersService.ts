import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  // Função para procurar todos os usuários cadastrados
  public async execute(): Promise<User[] | undefined> {
    return this.usersRepository.findAll();
  }
}
