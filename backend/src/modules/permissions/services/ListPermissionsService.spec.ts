import FakePermissionsRepository from '../repositories/fakes/FakePermissionsRepository';
import ListPermissionsService from './ListPermissionsService';

let fakePermissionsRepository: FakePermissionsRepository;
let listPermissions: ListPermissionsService;

describe('ListPermissions', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    listPermissions = new ListPermissionsService(fakePermissionsRepository);
  });

  it('should be able to list all permissions created', async () => {
    const permissionOne = await fakePermissionsRepository.create({
      name: 'permission-name-one',
    });

    const permissionTwo = await fakePermissionsRepository.create({
      name: 'permission-name-two',
    });

    const permissions = await listPermissions.execute();

    expect(permissions).toEqual(
      expect.arrayContaining([permissionOne, permissionTwo]),
    );
  });
});
