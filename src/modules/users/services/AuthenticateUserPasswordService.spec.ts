import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserPasswordService from './AuthenticateUserPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let AuthenticateUser: AuthenticateUserPasswordService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    AuthenticateUser = new AuthenticateUserPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions: 'Admin',
    });

    const response = await AuthenticateUser.execute({
      email: 'janedoe@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should NOT be able to authenticate an inexistent user', async () => {
    await expect(
      AuthenticateUser.execute({
        email: 'janedoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to authenticate an user with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions: 'permission-id',
    });

    await expect(
      AuthenticateUser.execute({
        email: 'janedoe@mail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
