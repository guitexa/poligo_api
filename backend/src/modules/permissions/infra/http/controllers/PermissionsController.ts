import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePermissionServices from '@modules/permissions/services/CreatePermissionServices';
import ListPermissionsServices from '@modules/permissions/services/ListPermissionsServices';

export default class PermissionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createPermission = container.resolve(CreatePermissionServices);

    const permission = await createPermission.execute({
      name,
    });

    return res.json(permission);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionsServices);

    const permissions = await listPermissions.execute();

    return res.json(permissions);
  }
}
