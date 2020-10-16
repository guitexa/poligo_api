import AppError from '@shared/errors/AppError';

import FakePermissionsRepository from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePermissionsRepository: FakePermissionsRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePermissionsRepository = new FakePermissionsRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakePermissionsRepository,
    );
  });

  it('should be able to create a new user', async () => {
    const permission = await fakePermissionsRepository.create({
      name: 'permission-name',
    });

    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT be able to create a new user with an existent email', async () => {
    const permission = await fakePermissionsRepository.create({
      name: 'permission-name',
    });

    await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    await expect(
      createUser.execute({
        name: 'Jane Doe',
        email: 'janedoe@mail.com',
        password: '123456',
        permissions_id: permission.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new user with an inexistent permission_id', async () => {
    await expect(
      createUser.execute({
        name: 'Jane Doe',
        email: 'janedoe@mail.com',
        password: '123456',
        permissions_id: 'inexistent_permission_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
