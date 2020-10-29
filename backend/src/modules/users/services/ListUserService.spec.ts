import FakePermissionsRepository from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUserService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let listUser: ListUserService;

describe('ListUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    listUser = new ListUserService(fakeUsersRepository);
  });

  it('should be able to list a specific user', async () => {
    const permission = await fakePermissionsRepository.create({
      name: 'permission-name',
    });

    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    const user = await listUser.execute(userOne.id);

    expect(user).toBe(userOne);
  });

  it('should NOT be able to list with inexistent user', async () => {
    await expect(listUser.execute('inexistent-user')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
