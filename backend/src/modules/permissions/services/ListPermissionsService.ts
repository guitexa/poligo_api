import { injectable, inject } from 'tsyringe';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';

import IPermissionsRepository from '../repositories/IPermissionsRepository';

@injectable()
export default class ListPermissionsService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permission[] | undefined> {
    return this.permissionsRepository.findAll();
  }
}
