import Permission from '../infra/typeorm/entities/Permission';
import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';

export default interface IPermissionsRepository {
  create(permissionName: ICreatePermissionDTO): Promise<Permission>;
  findById(permissionId: string): Promise<Permission | undefined>;
  findByName(permissionName: string): Promise<Permission | undefined>;
  findAll(): Promise<Permission[] | undefined>;
}
