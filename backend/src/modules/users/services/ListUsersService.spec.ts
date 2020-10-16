import FakePermissionsRepository from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list users', async () => {
    const permission = await fakePermissionsRepository.create({
      name: 'permission-name',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      permissions_id: permission.id,
    });

    const users = await listUsers.execute();

    expect(users).toEqual(expect.arrayContaining([loggedUser, userOne]));
  });
});
