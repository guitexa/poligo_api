import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, userData);

    this.usersRepository.push(user);

    return user;
  }

  public async findAll(): Promise<User[] | undefined> {
    return this.usersRepository;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.find(user => user.email === email);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    return this.usersRepository.find(user => user.id === user_id);
  }
}
