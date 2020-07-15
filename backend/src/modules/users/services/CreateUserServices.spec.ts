import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserServices from './CreateUserServices';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserServices;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserServices(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT be able to create a new user with an existent email', async () => {
    await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Jane Doe',
        email: 'janedoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
