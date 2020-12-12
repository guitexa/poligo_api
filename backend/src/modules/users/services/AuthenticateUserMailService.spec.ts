import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserMailService from './AuthenticateUserMailService';

let fakeUsersRepository: FakeUsersRepository;
let AuthenticateUserMail: AuthenticateUserMailService;

describe('AuthenticateUserMail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    AuthenticateUserMail = new AuthenticateUserMailService(fakeUsersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions: 'Admin',
    });

    const response = await AuthenticateUserMail.execute({
      email: 'janedoe@mail.com',
    });

    expect(response).toBe(user);
  });

  it('should NOT be able to authenticate with an inexistent user', async () => {
    await expect(
      AuthenticateUserMail.execute({
        email: 'janedoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
