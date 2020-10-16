import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePermissionService from '@modules/permissions/services/CreatePermissionService';
import ListPermissionsService from '@modules/permissions/services/ListPermissionsService';

export default class PermissionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({
      name,
    });

    return res.json(permission);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionsService);

    const permissions = await listPermissions.execute();

    return res.json(permissions);
  }
}
