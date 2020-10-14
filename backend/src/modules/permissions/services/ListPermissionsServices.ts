import { injectable, inject } from 'tsyringe';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
// import AppError from '@shared/errors/AppError';

import IPermissionsRepository from '../repositories/IPermissionsRepository';

@injectable()
export default class ListPermissionsServices {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permission[]> {
    const permissions = await this.permissionsRepository.findAll();

    return permissions;
  }
}
