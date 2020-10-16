import AppError from '@shared/errors/AppError';

import FakePermissionsRepository from '../repositories/fakes/FakePermissionsRepository';
import CreatePermissionService from './CreatePermissionService';
import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;

describe('CreatePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);
  });

  it('should be able to create a new permission', async () => {
    const permission = await createPermission.execute({
      name: 'permission-name',
    });

    expect(permission).toHaveProperty('id');
  });

  it('should NOT be able to create a new permission without name', async () => {
    await expect(
      createPermission.execute({} as ICreatePermissionDTO),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new permission with a existent name', async () => {
    const permission = await createPermission.execute({
      name: 'permission-name',
    });

    await expect(
      createPermission.execute({
        name: permission.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
