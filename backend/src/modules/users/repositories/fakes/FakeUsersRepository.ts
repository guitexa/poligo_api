import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.usersRepository.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.find(user => user.email === email);
  }

  public async findAll(): Promise<User[] | undefined> {
    return this.usersRepository;
  }
}
