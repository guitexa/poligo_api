import { Repository, getRepository } from 'typeorm';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';
import Permission from '../entities/Permission';

export default class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async create(
    permissionName: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = this.ormRepository.create(permissionName);

    await this.ormRepository.save(permission);

    return permission;
  }

  public async findById(permissionId: string): Promise<Permission | undefined> {
    const permission = this.ormRepository.findOne({
      where: {
        id: permissionId,
      },
    });

    return permission;
  }

  public async findByName(
    permissionName: string,
  ): Promise<Permission | undefined> {
    const permission = this.ormRepository.findOne({
      where: {
        name: permissionName,
      },
    });

    return permission;
  }

  public async findAll(): Promise<Permission[] | undefined> {
    const permissions = this.ormRepository.find();

    return permissions;
  }
}
