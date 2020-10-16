import { injectable, inject } from 'tsyringe';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import AppError from '@shared/errors/AppError';

import IPermissionsRepository from '../repositories/IPermissionsRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Permission> {
    if (!name) {
      throw new AppError('A name must be provided', 404);
    }

    const checkIfPermissionExists = await this.permissionsRepository.findByName(
      name,
    );

    if (checkIfPermissionExists) {
      throw new AppError('This permissions already exists', 401);
    }

    const permission = await this.permissionsRepository.create({
      name,
    });

    return permission;
  }
}
