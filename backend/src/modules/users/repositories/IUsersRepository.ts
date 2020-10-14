import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[] | undefined>;
  create(userData: ICreateUserDTO): Promise<User>;
}
