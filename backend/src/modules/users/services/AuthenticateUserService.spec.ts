import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const AuthenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const response = await AuthenticateUser.execute({
      email: 'janedoe@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should NOT be able to authenticate an inexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const AuthenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      AuthenticateUser.execute({
        email: 'janedoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to authenticate an user with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const AuthenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      AuthenticateUser.execute({
        email: 'janedoe@mail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
