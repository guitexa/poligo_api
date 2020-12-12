import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list users', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
      permissions: 'Admin',
    });

    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      permissions: 'Admin',
    });

    const users = await listUsers.execute();

    expect(users).toEqual(expect.arrayContaining([loggedUser, userOne]));
  });
});
