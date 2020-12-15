import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  // Função para criar um user
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  // Função para procurar todos os users cadastrados
  public async findAll(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find();

    return users;
  }

  // Função para procurar um user pelo email
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  // Função para procurar um user pelo ID
  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}
