import { uuid } from 'uuidv4';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';
import Permission from '../../infra/typeorm/entities/Permission';

export default class FakePermissionsRepository
  implements IPermissionsRepository {
  private permissionRepository: Permission[] = [];

  public async create(
    permissionName: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, { id: uuid() }, permissionName);

    this.permissionRepository.push(permission);

    return permission;
  }

  public async findById(permissionId: string): Promise<Permission | undefined> {
    return this.permissionRepository.find(
      permission => permission.id === permissionId,
    );
  }

  public async findByName(
    permissionName: string,
  ): Promise<Permission | undefined> {
    return this.permissionRepository.find(
      permission => permission.name === permissionName,
    );
  }

  public async findAll(): Promise<Permission[] | undefined> {
    return this.permissionRepository;
  }
}
